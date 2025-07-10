<script setup>
import { computed } from 'vue';
import { addItem } from '@/services/cartService';
import { useCounterStore } from '@/stores/account'
import { useRouter } from 'vue-router';

const router = useRouter();
const counterStore = useCounterStore();
const props = defineProps({
  item: {
    id: Number,
    imgPath: String,
    name: String,
    price: Number,
    discountPer: Number,
  },
});

const computedItemDiscountPrice = computed(() => {
  return (
    (
      props.item.price -
      (props.item.price * props.item.discountPer) / 100
    ).toLocaleString() + '원'
  );
});

const put = async () => {
  const res = await addItem(props.item.id);
  if (counterStore.state.loggedIn === false){
    alert('로그인을 해야 합니다.');
    return;

  }if (res === undefined || res.status !== 200) {
    return;
  } else if (confirm('장바구니에 상품을 담았습니다. 장바구니로 이동하시겠습니까?')){
      router.push('/cart');
  }
};
</script>

<template>
  <div class="card shadow-sm">
    <!-- 상품 사진 -->
    <span
      class="img"
      :style="{ backgroundImage: `url(/pic/item/${props.item.imgPath})` }"
      :aria-label="`상품 사진(${props.item.name})`"
    ></span>
    <div class="card-body">
      <p class="card-text">
        <!-- 상품 이름 -->
        <span class="me-2">{{ props.item.name }}</span>
        <!-- 상품 할인율 -->
        <span class="discount badge bg-danger">{{
          props.item.discountPer
        }}</span>
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <button class="btn btn-primary btn-sm" @click="put()">
          장바구니 담기
        </button>
        <small class="price text-muted">{{ props.item.price.toLocaleString() }}원</small>
        <small class="real text-danget">{{ computedItemDiscountPrice }}</small>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  .img {
    display: inline-block;
    width: 100%;
    height: 250px;
    background-size: cover;
    background-position: center;
  }
  .card-body .price {
    text-decoration: line-through;
  }
}
</style>
