import { fetchCategory } from '../utils/api';
import React from 'react';
import Loading from './Loading';
import { Link } from "react-router-dom";


function Cards({ categories, difficulty, takeQuiz }) {
    return (
        <ul style={{ display: "grid", gridTemplateColumns: `repeat(4,20%)`, justifyContent: 'space-evenly', rowGap: '1rem' }} className='cards'>
            {
                categories.map((c, i) => {
                    return (
                        <li key={i}>
                            <p>{c.name}</p>
                            <Link onClick={() => takeQuiz(c.id, difficulty)} to={'/quiz'}>let`s starT</Link>
                        </li>
                    )
                })
            }
        </ ul>
    )

}
function QuizLevel(props) {
    return (
        <div style={{ width: '90%' }}>
            <form className='quiz-level' >
                <label htmlFor="level">Difficulty:</label>
                <select name="level" id="level" onChange={props.selectChange}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </form>
        </div>
    )
}

function QuizNav({ selected, onUpdateCat }) {
    let CatNavs = ['All', 'General', 'Entertainment', 'Science', 'Mythology', 'Sports', 'Geography',
        'History', 'Politics', 'Art', 'Celebrities', 'Animals', 'Vehicles']
    return (
        <ul className='flex justify-content' style={{ margin: '0.5rem 0' }}>
            {CatNavs.map((c) => (
                <li key={c}  >
                    <button
                        style={selected === c ? { color: 'rgb(187,46,31)' } : null}
                        onClick={() => onUpdateCat(c)}
                        className='sketchy'
                    >
                        {c}
                    </button>
                </li>

            )
            )}
        </ul>
    )
}

class Nav extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedCat: 'All',
            categories: {},
            error: null,
            difficulty: 'easy'
        }
    }

    componentDidMount() {
        localStorage.clear()
        this.updateCategory(this.state.selectedCat)
    }

    updateCategory = (selectedCat) => {
        this.setState({ selectedCat, error: null })

        if (!this.state.categories[selectedCat]) {
            fetchCategory(selectedCat)
                .then((data) => {
                    this.setState(({ categories }) => ({
                        categories: {
                            ...categories,
                            [selectedCat]: data
                        }
                    }))
                }).catch((error) => {
                    console.warn('Error fetching categories', error);
                    this.setState({ error: `There was an error fetching the categories.` })
                })
        }
    }


    // it is used for loader componenT
    isLoading = () => {
        let { categories, selectedCat, error } = this.state
        return !categories[selectedCat] && error === null
    }

    selectChange = (e) => {
        this.setState({ difficulty: e.target.value })
    }

    render() {
        let { selectedCat, categories, error, difficulty } = this.state

        return (
            <div>
                {<QuizNav selected={selectedCat} onUpdateCat={this.updateCategory} />}
                {this.isLoading() && <Loading />}
                {error && <p>{error}</p>}
                {categories[selectedCat] &&
                    <div className='flex flex-column'>
                        <QuizLevel selectChange={this.selectChange} />
                        <Cards categories={categories[selectedCat]} difficulty={difficulty} takeQuiz={this.props.takeQuiz} />
                    </div>
                }
            </div>
        )
    }
}

export default Nav