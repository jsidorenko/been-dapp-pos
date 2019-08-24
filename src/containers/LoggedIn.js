import React from 'react';
import styled from 'styled-components';
import HeaderBlock from "../components/HeaderBlock";
import { fetchHistoryAction } from '../actions/walletActions';
import { connect } from 'react-redux';

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

const Filters = styled.div`
  margin-top: 10px;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-around;
`;

const Filter = styled.div`
  display: flex;
  height: 100px;
  width: 100px;
  border: 1px black solid;
  border-color: ${props => props.active ? 'blue' : 'black'};
  border-radius: 5px;
  background-color: ${props => props.disabled ? '#d4d0d0' : '#fff'};
  align-items: center;
  justify-content: center;
`;


type Props = {
  paymentsHistory: Object[],
  dataHistory: Object[],
  fetchHistory: Function,
};

type State = {
  selectedFilter: string,
};

class LoggedIn extends React.Component<Props, State> {
  state = {
    selectedFilter: '',
  };

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
    this.props.fetchHistory();
  }

  setFilter = (filterName) => {
    this.setState({ selectedFilter: filterName });
  };

  resetFilter = (filterName) => {
    this.setState({ selectedFilter: '' });
  };

  render() {
    const { selectedFilter } = this.state;
    return (
      <Container>
        <ContentWrapper>
          <HeaderBlock />
          <Filters>
            {this.items.map(item => (
              <Filter
                active={item.name === selectedFilter}
                key={item.name}
                onClick={() => this.setFilter(item.name)}
              >{item.name}</Filter>
            ))}
            <Filter
              disabled={!selectedFilter}
              onClick={() => this.resetFilter()}
            >Reset</Filter>
          </Filters>
        </ContentWrapper>
      </Container>
    )
  }
}

const mapStateToProps = ({
  wallet: { paymentsHistory, dataHistory },
}) => ({
  paymentsHistory,
  dataHistory,
});

const mapDispatchToProps = (dispatch) => ({
  fetchHistory: () => dispatch(fetchHistoryAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);
