import * as React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';

// Styles
import '../../../node_modules/codemirror/lib/codemirror.css';

export default class Editor extends React.Component<{}, IEditorState> {
	public constructor(props = {}) {
		super(props);
		this.state = {
			code: '',
		};
	}

	public render() {
		const { code } = this.state;
		const options = {
			lineNumbers: true,
		};

		console.log("HELLO", this.state); // tslint:disable-line

		return (
			<CodeMirror value={code} onChange={this.updateCode} options={options} />
		);
	}

	public updateCode = (editor: any, data: any, code: string) => {
		this.setState({
			code
		});
	};
}

interface IEditorState {
	code: string
}
