import React from 'react';

class Loading extends React.Component {
    state = {
        content: 'Loading'
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.state.content === 'Loading' + '...'
                ? this.setState({ content: 'Loading' })
                :
                this.setState(({ content }) => ({ content: content + '.' }))
        }, 500)

    }


    componentWillUnmount() {
        // this fn is called when Loading COMPONENT is not working in his parent componenT
        clearInterval(this.interval)
    }

    render() {
        return (
            <p style={{ textAlign: 'center', color: 'red', fontSize: '2rem' }}>{this.state.content}</p>
        )
    }

}

export default Loading