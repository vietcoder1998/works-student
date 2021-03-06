import React, { Component } from 'react';
// import * as _ from 'lodash';
import { connect } from 'react-redux';
import { _requestToServer } from '../../../services/exec';
import { _get } from '../../../services/base-api';
import { PUBLIC_HOST } from '../../../environment/development';
import { Row, Col, Button, Icon } from 'antd';
import { PUT } from '../../../const/method';
import { REDUX_SAGA } from '../../../const/actions';
import { noInfoHeader } from '../../../services/auth';
import { SKILLS } from '../../../services/api/public.api';
import { SKILLS_P } from '../../../services/api/private.api';


interface IProps {
    skills?: Array<{ id?: number, name?: string }>;
    getData?: Function;
    _fixData?: Function;
    index?: string;
}

interface IState {
    state?: Array<string>,
    list_skills?: Array<any>,
    skills?: Array<{ id?: number, name?: string }>,
    params: {
        pageIndex: number,
        pageSize: number,
    },
    list_tag: Array<{ id?: number, name?: string }>
}

class FixSkills extends Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            state: ['Thiết kế', 'PHP', 'html'],
            list_skills: [],
            skills: [],
            params: {
                pageIndex: 0,
                pageSize: 0,
            },
            list_tag: []
        }
    }

    async componentDidMount() {
        let { skills } = this.props;
        let { list_skills } = this.state;
        let res = await _get(null, SKILLS, PUBLIC_HOST, noInfoHeader);
        list_skills = res.data.items;
        this.setState({ list_skills, skills });
    }

    _addLabel = (item, index) => {
        let { skills, list_skills } = this.state;
        skills.push(item);
        if (index !== -1) {
            list_skills.splice(index, 1);
        };
        this.setState({ skills, list_skills });
    }

    _removeTag = (index_skills, name_skills, id_skills) => {
        let { skills, list_skills } = this.state;
        let index = index_skills;

        if (index !== -1) {
            skills.splice(index, 1);
        };

        list_skills.push({ id: id_skills, name: name_skills })
        this.setState({ skills, list_skills })
    }

    _createRequest = async () => {
        await this.requestToServer();
    }

    async requestToServer() {
        let { skills } = this.state;
        let array_list_skills = skills.map((item) => {
            return item.id;
        })

        await _requestToServer(PUT, array_list_skills, SKILLS_P, null, null, null, true);
        await this.props.getData();
        await this.setState({ skills: this.props.skills })
        await this.props._fixData('skills')
    }

    _getSkills = (name?: string) => {

    }

    render() {
        let { list_skills, skills } = this.state;
        return (
            <div className='wrapper'>
                <div className='ability'>
                    {/* List Skills */}
                    <p><b>Thêm kĩ năng hoặc công việc phù hợp</b></p>
                    <div className='list-ability'>
                        {skills && skills.map((item, index?: number) => {
                            return (
                                <label key={index} className='tag-ablity'>
                                    {item.name}
                                    <Icon type="close" onClick={() => { this._removeTag(index, item.name, item.id) }} />
                                </label>
                            );
                        })}
                    </div>
                    <div className='list-skills'>
                        <ul className='data-api'>
                            {list_skills && list_skills.map((item, index) => {
                                return (
                                    <label
                                        id={item.id}
                                        key={index}
                                        onClick={() => this._addLabel(item, index)}
                                    >
                                        {item.name}
                                    </label>
                                )
                            })}
                        </ul>
                    </div>
                    <Row className="holder-button">
                        <Col span={12}>
                            <Button
                                type="danger"
                                size="large"
                                icon="close"
                                onClick={() => {
                                    this.props._fixData("skills");
                                }}
                            >
                                Hủy
                        </Button>
                        </Col>
                        <Col span={12}>
                            <Button
                                type="primary"
                                size="large"
                                icon="save"
                                onClick={() => this._createRequest()}
                            >
                                Lưu
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
    getData: () => dispatch({ type: REDUX_SAGA.PERSON_INFO.GET_FULL_PERSON_INFO }),
})

const mapStateToProps = (state) => {
    return {
        skills: state.FullPersonalInfo.skills
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FixSkills);
