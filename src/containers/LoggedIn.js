import React from 'react';
import styled from 'styled-components';
import HeaderBlock from "../components/HeaderBlock";
import { fetchHistoryAction } from '../actions/walletActions';
import { connect } from 'react-redux';

const TX_POINTS = 'points';
const TX_DATA = 'data';

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

const Transactions = styled.div`
  margin-top: 25px;
`;

const Transaction = styled.div`
  margin-bottom: 5px;
  padding: 5px;
  border: 1px #d4d0d0 solid;
  border-radius: 5px;
`;

const Label = styled.div`
  color: #5d5b5b;
`;

const Time = styled.div``;
const Address = styled.div`
  float: right;
`;
const Data = styled.div`
  color: #5d5b5b;
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
  interval;

  state = {
    selectedFilter: '',
  };

  items = [
    {
      name: 'Ice cream',
      type: TX_POINTS,
    },
    {
      name: 'T-shirts',
      type: TX_DATA,
    }
  ];

  componentDidMount() {
    this.props.fetchHistory();

    this.interval = setInterval(() => {
      console.log(new Date());
      this.props.fetchHistory();
    }, 20000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  setFilter = (filterName) => {
    this.setState({ selectedFilter: filterName });
  };

  resetFilter = (filterName) => {
    this.setState({ selectedFilter: '' });
  };

  render() {
    const { paymentsHistory = [], dataHistory = [] } = this.props;
    const { selectedFilter } = this.state;
    const pointsTransactions = paymentsHistory.map(el => ({...el, type: TX_POINTS}));
    const dataTransactions = dataHistory.map(el => ({...el, type: TX_DATA}));

    let transactions = [];
    if (!selectedFilter) {
      transactions = [...pointsTransactions, ...dataTransactions];
    } else if (selectedFilter === TX_POINTS) {
      transactions = [...pointsTransactions];
    } else if (selectedFilter === TX_DATA) {
      transactions = [...dataTransactions];
    }

    transactions.sort((a, b) => +b.date - +a.date);

    return (
      <Container>
        <ContentWrapper>
          <HeaderBlock />
          <Filters>
            {this.items.map(item => (
              <Filter
                active={item.name === selectedFilter}
                key={item.name}
                onClick={() => this.setFilter(item.type)}
              >{item.name}</Filter>
            ))}
            <Filter
              disabled={!selectedFilter}
              onClick={() => this.resetFilter()}
            >Reset</Filter>
          </Filters>
          <Transactions>
            <Label>Transactions:</Label>
            {transactions.map((tx, i) => (
              <Transaction key={`tx${i}`}>
                <Address>{tx.sellerId}</Address>
                <Time>{tx.date.toLocaleString()}</Time>
                <Data>
                  {tx.type === TX_POINTS && <span>Value: {tx.value}</span>}
                  {tx.type === TX_DATA && Object.keys(tx.data || {}).map((dataEl, ii) => (
                    <span key={`tx${i}data${ii}`}>{dataEl}: {tx.data[dataEl]}<br /></span>
                  ))}
                </Data>
              </Transaction>
            ))}
          </Transactions>
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
