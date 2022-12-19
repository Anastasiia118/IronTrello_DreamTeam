<template>
  <div
    class="bg-gradient-to-b from-zinc-700 to-violet-900 text-zinc-300 flex flex-col items-center pt-[60px] pb-[60px] h-[100vh]"
  >
    <div
      class="bg-zinc-800 rounded-[50px] min-h-fit w-[80vw] flex flex-col md:flex-col justify-center items-center px-2 pt-6"
    >
      <div
        class="px-4 text-center mb-6 flex flex-col justify-center items-center text-xs md:text-sm"
      >
        <!-- div para la parte izquierda-->
        <img
          src="../assets/images/noun-404-error.png"
          alt="page error face"
          class="w-[80px] opacity-70 mt-[15px]"
        />
        <h1 class="text-3xl md:text-6xl mb-6 font-bold text-purple-500">
          YOU SEEM TO BE LOST!
        </h1>
        <p>The page you're looking for isn't available.</p>
        <p>But before leaving... <b> enjoy the video! </b></p>
      </div>

      <div>
        <!-- DIV for video -->

        <video
          controls
          class="w-fit md:w-[500px] rounded-xl mb-[20px] shadow-3xl"
        >
          <source src="../assets/videos/iron3.mp4" />
        </video>

        <div class="text-center">
          <button
            @click="goBack"
            class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-2.5 text-center my-5"
          >
            ← Go back
          </button>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from "../components/AppFooter.vue";

export default {
  methods: {
    goBack() {
        this.$router.go(-1)
    },
  },
  components: {
    AppFooter,
  },
};
</script>
