<template>
  <div>sigralR For Asp</div>
</template>

<script>
import{HubConnectionBuilder}from '@microsoft/signalr';
const connect = new HubConnectionBuilder().withUrl('https://localhost:5001/chatHub').build();
connect.start();
export default {

}
</script>

<style>

</style>