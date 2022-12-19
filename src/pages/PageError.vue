<template>

<div class="bg-gradient-to-b from-zinc-700 to-violet-900 text-zinc-300 flex flex-col justify-center items-center pt-[60px] pb-[100px] h-[100vh] ">

<div class="bg-zinc-800  rounded-[50px] h-[80vh] w-[80vw] flex flex-col md:flex-col justify-center items-center">

    <div class="px-4 text-center mb-12 flex flex-col justify-center items-center">
    <!-- div para la parte izquierda-->
    <img src="../assets/images/noun-404-error.png" alt="page error face" class="w-[80px] opacity-80">
    <h1 class="text-6xl mb-6"> YOU SEEM TO BE LOST!</h1>
    <p>The page you're looking for isn't available.</p>
    <p>But before leaving... <b> enjoy the video! </b></p>
</div>

<div>
   <!-- DIV for video -->

<video controls class="w-[500px] rounded-xl px-2 mb-[20px] shadow-3xl">
    <source src="../assets/videos/iron3.mp4">
</video>

<div class="text-center">
    <button class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-2.5 text-center my-3">← Go back</button>
</div>
</div>


</div>
</div>
</template>

<script>

</script>