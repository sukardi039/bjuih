<template>
  <img id="advert" width="100%" src="/images/ad02.jpg" alt="" />
</template>

<script setup>
const images = ['ad01.jpg', 'ad02.jpg', 'ad03.jpg']
let id = 0
setInterval(nextImg, 3000)
function nextImg() {
  id++
  id = id % 3
  // console.log(id, images[id])
  document.getElementById('advert').src = '/images/' + images[id]
}
</script>
