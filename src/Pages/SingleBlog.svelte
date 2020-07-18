<script>
  import { onMount } from "svelte";

  export let params;

  const apiUrl = "https://jsonplaceholder.typicode.com/posts/";
  let data = loadData();
  

  async function loadData() {
    const res = await fetch(apiUrl + params.id);
    const text = await res.json();

    if (res.ok) {
      return text;
    } else {
      throw new Error(text);
    }
  }
</script>

{#await data}
	<p>...waiting</p>
{:then data}
	<h1>{data.title}</h1>
    <p>{data.body}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
