import { shallowMount } from "@vue/test-utils";
import Footer from "@/components/Footer/Footer.vue";

describe("Footer.vue", () => {
  it("renders Footer properly", () => {
    const wrapper = shallowMount(Footer);
    expect(wrapper).toMatchSnapshot();
  });
});
