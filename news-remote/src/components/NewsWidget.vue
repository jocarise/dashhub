<template>
  <div class="svg_container" data-testid="news-vue-widget">
    <figure class="image is-128x128" data-testid="news-vue-logo">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>vuejs</title>
        <path
          d="M2,3H5.5L12,15L18.5,3H22L12,21L2,3M6.5,3H9.5L12,7.58L14.5,3H17.5L12,13.08L6.5,3Z"
          fill="#41B883"
        />
      </svg>
    </figure>
  </div>
</template>

<script>
export default {
  name: 'NewsWidget',
};
</script>

<style lang="scss">
@import 'bulma/css/bulma.css';

.svg_container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
