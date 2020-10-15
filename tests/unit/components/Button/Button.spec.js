import { shallowMount } from "@vue/test-utils";
import Button from "@/components/Button/Button.vue";

describe("Button.vue", () => {
  it("renders props.buttonText when passed", () => {
    const msg = "hello world";
    const wrapper = shallowMount(Button, {
      propsData: { buttonText: msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
