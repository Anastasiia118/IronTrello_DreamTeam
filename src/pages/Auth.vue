<template>
    <!-- opción de background bg-zinc-700 -->

<div class="bg-gradient-to-b from-zinc-700 to-violet-900 text-zinc-300 flex flex-col items-center pt-[40px] pb-[50px] min-h-[100vh] " >

<RouterView class="md:flex-1 flex"/>
<AppFooter class="mt-6" />
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