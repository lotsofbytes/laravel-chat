<!-- resources/views/chat.blade.php -->

@extends('layouts.app')

@section('content')
<div class="container">
    <div class="card">
        <div class="card-header">会員チャット</div>
        <div class="card-body">
            <chat-messages :messages="messages" :user="{{ auth()->user() }}"></chat-messages>
        </div>
        <div class="card-footer">
            <chat-form v-on:messagesent="addMessage" :user="{{ auth()->user() }}"></chat-form>
        </div>
    </div>
</div>

<confirm-modal
  :visible="modalVisible"
  v-on:confirmed="askPermission"
  question="お知らせを受け取りますか？">
</confirm-dialog>

@endsection

@push('scripts')
    @vite(['resources/js/chat.js'])
@endpush
