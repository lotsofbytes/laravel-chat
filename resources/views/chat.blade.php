<!-- resources/views/chat.blade.php -->

@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8">
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
        <div class="col-md-4">
            <div class="card">
                <div class="card-header">参加会員</div>
                <div class="card-body">
                    <ul>
                        <li v-for="member in members" v-text="member.name"></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
    @vite(['resources/js/chat.js'])
@endpush
