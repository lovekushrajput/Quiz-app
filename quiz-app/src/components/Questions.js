import React from "react";
import DeclareResult from './Results'
import { fetchQuestion } from "../utils/api";

export default class Questions extends React.Component {
    constructor() {
        super()
        this.state = {
            count: JSON.parse(localStorage.getItem('quesCount')) || 0,
            error: JSON.parse(localStorage.getItem('err')) || null,
            answersData: JSON.parse(localStorage.getItem('ansData')) || null,
            questData: JSON.parse(localStorage.getItem('quesData')) || null,
            isResult: JSON.parse(localStorage.getItem('result')) || false
        }

        this.selectAns = []
    }

    handleLocalStorage = () => {
        let { count, error, answersData, questData, isResult } = this.state
        localStorage.setItem('quesCount', JSON.stringify(count))
        localStorage.setItem('err', JSON.stringify(error))
        localStorage.setItem('ansData', JSON.stringify(answersData))
        localStorage.setItem('quesData', JSON.stringify(questData))
        localStorage.setItem('result', JSON.stringify(isResult))
    }


    onSelected = (e) => {
        if (e.target.localName === 'li') {

            let ans = e.target.innerText
            if (ans) {



                //if selected ans already in selectAns then delete it
                !this.selectAns.includes(ans) ?
                    this.selectAns.push(ans)
                    : this.selectAns = this.selectAns.filter((elm) => elm !== ans)


                this.setState(({ answersData }) => ({
                    error: null,
                    answersData: answersData.map((a, i) => {
                        if (i === this.state.count) {
                            a['selectedAns'] = this.selectAns
                        }

                        return a
                    })
                }), this.handleLocalStorage)

            }

        }

    }

    handleNextBnt = () => {

        if (this.selectAns.length === 0) {
            this.setState({ error: 'Select an answer to go forward!' }, this.handleLocalStorage)
        } else {

            if (this.state.count < 9) {
                this.setState(PrevState => ({ count: PrevState.count + 1 }), this.handleLocalStorage)
                this.selectAns = []
            } else {
                this.setState({ isResult: true }, this.handleLocalStorage)
            }
        }

    }


    componentDidMount() {
        let { id, difficulty } = this.props.questionsData
        let { answersData, questData } = this.state

        if (id && difficulty) {
            fetchQuestion(id, difficulty).then((data) => {
                if (data) {
                    this.setState({ questData: data, answersData: data }, this.handleLocalStorage)
                }
            })
        } else {

            this.setState({
                questData: JSON.stringify(this.props.questionsData) === '{}' ? questData : this.props.questionsData,
                answersData: JSON.stringify(this.props.questionsData) === '{}' ? answersData : this.props.questionsData
            }, this.handleLocalStorage)

        }

    }

    render() {
        let { count, error, isResult, questData } = this.state
        let options
        if (questData) {
            let { correct_answer, incorrect_answers } = questData[count]
            options = incorrect_answers.concat(correct_answer)
        }

        return (
            <>

                {
                    isResult ? <DeclareResult updatedData={this.state.answersData} oldData={this.state.questData} /> :

                        <div className="flex justify-center" >
                            {
                                options &&
                                <div className='question width-60'>
                                    <p>Questions {count + 1}/{questData.length}</p>

                                    <div className="progress">
                                        <div className="progress-bar" style={{ width: `${(count + 1) * 10}%` }}>
                                        </div>
                                    </div>

                                    <h2>{questData[count].question}</h2>
                                    <ul onClick={(e) => this.onSelected(e)}>
                                        {
                                            options.map((option) =>
                                                <li
                                                    key={option}
                                                    style={{ margin: '0.8rem', padding: '1rem', cursor: 'pointer', border: '1px solid rgba(0, 0, 0,0.1)' }}
                                                    className={this.selectAns.includes(option) ? 'sQ' : ''}
                                                >
                                                    {option}
                                                </li>)
                                        }
                                    </ul>

                                    {error && <p style={{ color: 'red' }}>{error}</p>}

                                    <button onClick={count < 10 ? this.handleNextBnt : ''} className='next-btn'>Next  </button>
                                </div>
                            }
                        </div>
                }
            </>
        )
    }
}
