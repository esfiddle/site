<template>
    <footer>
        <smallLogo />
        <div class='spacer'/>
        <div class='footerLinks'>
            <router-link to="/examples">Examples</router-link>
            <router-link to="/editor">Editor</router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/blog">Blog</router-link>
        </div>
    </footer>
</template>

<script>
import SmallLogo from '../../../public/img/SmallLogo.svg';

export default {
  name: 'Footer',
  components: {
    SmallLogo,
  },
};
</script>

<style scoped>
footer {
    position: relative;
    display: flex;
    margin-top: auto;
    background: var(--light);
    align-items: center;
}

footer svg {
    height: 36px;
    transform: translateY(1px);

}
footer .footerLinks {
    color: rgba(0,0,0,.7);
    font-size: 18px;
    font-weight: bold;
    padding: 16px;
    text-align: right;
}
footer .footerLinks a {
    color: inherit;
    text-decoration: inherit;
    display: inline-block;
    padding: 0 16px;
    position: relative;
}

footer .footerLinks a.active {
    color: rgba(0,0,0,0.4);
    pointer-events: none;
}
</style>
