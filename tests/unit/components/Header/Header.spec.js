import { createLocalVue, shallowMount, RouterLinkStub } from "@vue/test-utils";
import Header from "@/components/Header/Header.vue";
import Vuex from "vuex";
import VueRouter from "vue-router";

describe("Footer.vue", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(VueRouter);

  const store = {
    state: {
      authorized: false,
      theme: null
    },
    mutations: {
      currentTheme(state, payload) {
        !payload ? (state.theme = "light") : (state.theme = "dark");
      },
      setAuthorization(state, payload) {
        state.authorized = payload;
      }
    }
  };

  const Footer = {
    template: `<div></div>`
  };

  const wrapper = shallowMount(Header, {
    localVue,
    store: new Vuex.Store(store),
    stubs: {
      RouterLink: RouterLinkStub,
      Footer
    }
  });

  it("should switch theme from light to dark", async () => {
    await wrapper.find("#themeSwitch").trigger("click");

    expect(wrapper.vm.themeState).toBe("dark");
  });
});
