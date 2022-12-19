<template>
    <!-- opción de background bg-zinc-700 -->

<div class="bg-gradient-to-b from-zinc-700 to-violet-900 text-zinc-300 flex flex-col justify-center items-center pt-[60px] pb-[100px] h-[100vh] " >

<RouterView />
<AppFooter class="" />
</div>

</template>

<script>
import AppFooter from '../components/AppFooter.vue';


export default {
     components: {
        AppFooter,
    },
}
</script>