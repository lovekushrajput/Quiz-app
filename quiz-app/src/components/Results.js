import Questions from './Questions'
import React from 'react'



function TableUI(props) {
    let score = 0
    return (
        <table style={{ margin: '1rem 0' }}>
            <thead>
                <tr>
                    <th className='width-50'>Question</th>
                    <th>Correct answers</th>
                    <th>You selected</th>
                    <th>Right or Wrong</th>
                </tr>
            </thead>
            <tbody>

                {
                    props.data.map((q, i) => {
                        return (
                            <tr key={i}>
                                <td className='width-60' style={{ fontSize: '1.5rem', letterSpacing: '1px' }}>{q.question}</td>
                                <td>{q.correct_answer}</td>
                                <td>{`${q.selectedAns}`}</td>
                                <td>{`${q.selectedAns}` === q.correct_answer ? 'Right ✔️' : 'Wrong ❌'}</td>
                                {/* for increase score */}
                                <td style={{ display: 'none' }}>{`${q.selectedAns}` === q.correct_answer ? score++ : ''}</td>
                            </tr>
                        )
                    })
                }

            </tbody>
            <tfoot>
                <tr>
                    <th>Total Correct</th>
                    <td>{score}</td>
                </tr>

            </tfoot>
        </table>
    )
}


export default class DeclareResult extends React.Component {
    state = {
        reTakeQuiz: JSON.parse(localStorage.getItem('retakeQuiz')) || false,
    }



    handleLocalStorage = () => {
        let { reTakeQuiz } = this.state
        localStorage.setItem('retakeQuiz', JSON.stringify(reTakeQuiz))
    }

    componentDidMount() {
        this.setState({ reTakeQuiz: this.state.reTakeQuiz }, this.localStorage)
    }

    render() {
        return (
            <>
                {

                    this.state.reTakeQuiz ? <Questions questionsData={this.props.oldData} /> :
                        <>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                                <div className='flex justify-space result' style={{ width: '70%' }}>
                                    <p style={{ fontSize: '2rem', color: 'rgb(249,47,96)' }}>Result of the quiz</p>
                                    <button onClick={
                                        () => {
                                            this.setState({ reTakeQuiz: true })
                                            localStorage.clear()
                                        }
                                    }
                                        className={'next-btn'}>
                                        Retake the quiz
                                    </button>
                                </div>
                            </div>
                            {<TableUI data={this.props.updatedData} />}
                        </>
                }

            </>
        )
    }
}