<script setup>
import MarkdownIt from 'markdown-it';
const markdown = new MarkdownIt();

defineProps({
  messages: Array,
  user: Object
});
</script>

<template>
  <ul style="list-style:none">
    <li v-for="message in messages"
      :key="message.id"
      :class="message.user.id === user.id ? 'text-end' : 'text-start'">
      <div class="header">
        <strong>
          <span v-if="message.user.id === user.id">私</span>
          <span v-else>{{ message.user.name }}さん</span>
        </strong>
      </div>
      <p v-if="message.user.id === user.id">{{ message.message }}</p>
      <p v-else v-html="markdown.render(message.message)"></p>
    </li>
  </ul>
</template>

<style>
ul {
  list-style-type: square;
}

pre, code {
  background-color:pink;
  padding: 4px;
}
</style>
