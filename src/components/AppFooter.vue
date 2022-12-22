<template>
    <footer class=" text-center">
<p class="text-xs"> © 2022 Ironello. All rights reserved. </p>   
</footer>
</template>

<script>

</script>
<style>

footer{
    
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 0 auto;
    height: 30px;

}
.text-xs{
    color: white;
}
@media (max-width: 480px) {
    footer{
        height: 60px;
       padding-bottom: 25px;
       
    }
}
</style>