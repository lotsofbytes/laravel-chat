/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import { createApp, ref } from 'vue';
import ChatMessages from './components/ChatMessages.vue';
import ChatForm from './components/ChatForm.vue';

/**
 * Next, we will create a fresh Vue application instance. You may then begin
 * registering components with the application instance so they are ready
 * to use in your application's views. An example is included for you.
 */

createApp({
    setup () {
        const messages = ref([]),
            members = ref([]);

        fetchMessages();

        window.Echo.join('chat')
            .here(users => {
                members.value = users;
            })
            .joining(user => {
                members.value.push(user);
            })
            .leaving(user => {
                members.value.splice(members.value.indexOf(user), 1);
            })
            .listen('MessageSent', (e) => {
                messages.value.push({
                    message: e.message.message,
                    user: e.user
                });
            });

        function fetchMessages() {
            axios.get('/messages').then(response => {
                messages.value = response.data;
            });
        }

        function addMessage(message) {
            messages.value.push(message);

            axios.post('/messages', message).then(response => {
                // success
            });
        }

        return {
            members,
            messages,
            fetchMessages,
            addMessage
        }
    }
})
.component('chat-messages', ChatMessages)
.component('chat-form', ChatForm)
.mount('#app');
