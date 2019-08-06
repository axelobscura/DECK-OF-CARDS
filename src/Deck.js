import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
import './Deck.css';

const BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      drawn: []
    };
    this.getCard = this.getCard.bind(this);
  }
  async componentDidMount(){
    let deck = await axios.get(`${BASE_URL}/new/shuffle/`);
    this.setState({
      deck: deck.data
    })
  }
  async getCard(){
    //https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/
    //make request using deck id
    try {
      let cardRes = await axios.get(`${BASE_URL}/${this.state.deck.deck_id}/draw/`);
      if(!cardRes.data.success){
        throw new Error('No Cards Remaining');
      }
      let card = cardRes.data.cards[0];
      this.setState(st => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`
          }
        ]
      }));
      console.log(cardRes.data);
    } catch(err) {
      alert(err);
    }
  }
  render() {
    const cards = this.state.drawn.map(card => (
      <Card id={card.id} image={card.image} name={card.name} />
    ));
    return (
      <div>
        <h1 className="Deck-title">♦ Card Dealer ♦</h1>
        <h2 className="Deck-title subtitle">♣ A little demo app made with React ♣</h2>
        <button className="Deck-btn" onClick={this.getCard}>Get Card!</button>
        <div className="Deck-cardarea">
          {cards}
        </div>
      </div>
    );
  }
}
 
export default Deck;