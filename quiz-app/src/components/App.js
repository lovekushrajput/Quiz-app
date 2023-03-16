import Home from "./Home";
import React from "react";
import Questions from "./Questions";
import { Link, Routes, Route } from "react-router-dom";
import Loading from "./Loading";

export default class App extends React.Component {
    constructor() {
        super()
        this.state = {
            questData: {}
        }
    }

    takeQuiz = (id, difficulty) => {
        this.setState({
            questData: {
                'id': id,
                'difficulty': difficulty
            }
        })
    }

    componentDidMount() {
        this.setState({
            questData: {}
        })
    }

    render() {
        let { questData } = this.state
        return (
            <div className="container">
                <Link to={'/'} className='logo'> QuizLanD?</Link>
                <Routes>
                    <Route path={'/'} element={<Home takeQuiz={this.takeQuiz} />} />
                    {
                        <Loading /> && <Route path={'/quiz'} element={<Questions questionsData={questData} />} />
                    }
                </Routes>
            </div>
        )
    }
}
