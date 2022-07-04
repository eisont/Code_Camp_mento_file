import renderer from "react-test-renderer";
import TestCodePage from ".";

test("페이지 테스트", () => {
    const component = renderer.create(<TestCodePage />);
    let tree: any = component.toJSON();
    expect(tree).toMatchSnapshot();

    renderer.act(() => {
        tree.props.onMouseEnter();
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    renderer.act(() => {
        tree.props.onMouseLeave();
    });
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
