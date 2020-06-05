import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor() {
            super();
            
            this.state = {
                error: null
            }

            axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            }, error => {
                this.setState({error: error})
            });

            axios.interceptors.response.use(response => response, error => {
                this.setState({error: error})
            });
        }

        // state = {
        //     error: null
        // }

        //no longer used we use constructor instead as it runs as soon as page loads
        // componentWillMount() {
        //     axios.interceptors.request.use(request => {
        //         this.setState({error: null});
        //         return request;
        //     }, error => {
        //         this.setState({error: error})
        //     });

        //     axios.interceptors.response.use(response => response, error => {
        //         this.setState({error: error})
        //     });
        // }

        errorHandled = () => {
            this.setState({error: null})
        };

        render() {
            return (
                <Aux>
                    <Modal 
                        show = {this.state.error}
                        modalClosed={this.errorHandled}>
                            {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;