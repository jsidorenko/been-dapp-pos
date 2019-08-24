import React from 'react';
import styled from 'styled-components';
import { ApiService, ENDPOINTS } from '../services/api';
import { Storage, STORAGE_KEYS } from "../services/storage";
import HeaderBlock from "../components/HeaderBlock";

const Container = styled.div`
  min-height: calc(100vh - 40px);
  position: relative;
  flex-direction: column;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

type State = {
  selectedFilter: string,
};

export default class LoggedIn extends React.Component<*, State> {
  items = [
    {
      name: 'Ice cream',
      type: 'points',
    },
    {
      name: 'T-shirts',
      type: 'data',
    }
  ];

  componentDidMount() {
    /*const publicKey = Storage.get(STORAGE_KEYS.PUBLIC_KEY, '');
    ApiService
      .get(ENDPOINTS.GET_QUIZZES, { pubkey: publicKey })
      .then(quizzes => this.setState({ quizzes: quizzes || [] }));

    fetch('http://www.mocky.io/v2/5d618e563200005d008e6126')
      .then(response => response.json())
      .then(json => {
        const threeFirstEvents = json.slice(0, 3);
        this.setState({ agenda: threeFirstEvents })
      })
      .catch(() => {})*/
  }

  render() {
    return (
      <Container>
        <ContentWrapper>
          <HeaderBlock />
          <div style={{ display: 'flex' }}>
            <div>Ice cream</div>
            <div>T-shirt</div>
            <div>Reset</div>
          </div>
        </ContentWrapper>
      </Container>
    )
  }
}
