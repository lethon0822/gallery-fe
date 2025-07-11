<script setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import { watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCounterStore } from './stores/account';
import { check } from '@/services/accountService';

const route = useRoute();
const account = useCounterStore();
const checkAccount = async () => {
  const res = await check();
  if (res === undefined || res.status != 200) {
    account.setChecked(false);
    return;
  } else {
    account.setChecked(true);
    account.setLoggedIn(res.data > 0);
  }
};

// 로그인 여부 확인
onMounted(async () => {
  checkAccount();
});

watch(() => route.path, () => {
    checkAccount();
  }
);
</script>

<template>
  <template v-if="account.state.checked">
    <Header />
    <router-view />
    <Footer />
  </template>
  <template v-else> 서버 통신 오류 </template>
</template>

<style scoped></style>
