<script setup lang="ts">
import AvatarAnimated from './AvatarAnimated.vue'
</script>

<template>
  <footer>
    <div class="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
      <nav>
        <h6 class="footer-title">Feedback</h6>
        <a
          href="https://github.com/d0rich/spotifly/issues"
          target="_blank"
          class="link link-hover"
          >Report an issue</a
        >
      </nav>
    </div>
    <div
      class="footer sm:footer-horizontal footer-center bg-primary text-primary-content p-4"
    >
      <aside>
        <p>
          Developer Ⓓ {{ new Date().getFullYear() }} - This website is developed
          by
          <a href="https://d0rich.me" class="link link-hover">
            d0rich (Nikolai Dorofeev) <AvatarAnimated
              class="inline-block w-6 h-6"
            />
          </a>
        </p>
      </aside>
    </div>
  </footer>
</template>
