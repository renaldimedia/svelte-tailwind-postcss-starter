<script>
  import router from "page";
  import Home from "./Pages/Home.svelte";
  import Blog from "./Pages/Blog.svelte";
  import SingleBlog from "./Pages/SingleBlog.svelte";

  let page;
  let params;

  router("/", () => (page = Home));
  router("/blog", () => (page = Blog));
  router(
    "/blog/:id",

    // Before we set the component
    (ctx, next) => {
      params = ctx.params;
      next();
    },

    // Finally set the component
    () => (page = SingleBlog)
  );
  router.start();
</script>

<style lang="postcss">
  main {
    width: 35em;
    max-width: calc(100vw - 3em);
    margin: 1.5em auto;
    & > h1 {
      color: green;
    }
  }
</style>

<nav>
  <a href="/">Home</a>
  <a href="/blog">Blog</a>
</nav>

<main>
 <svelte:component this={page} params={params} />
</main>
