<template>
Soy el Auth <br>
<RouterView />

</template>

<script>
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';

export default {
    components: {
        SignIn,
        SignUp,
    },
}
</script>