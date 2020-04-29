import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';
import Layout from '../layout/Layout';
import './Profile.scss';

// Layer
import Block from '../layout/block/Block';
import FixShortProfile from './fix/FixShortProfile/FixShortProfile';
import ShortProfile from './infor/ShortProfile/ShortProfile';
import FixDescription from "./fix/FixDescription/FixDescription";
import Description from './infor/Description/Description';
import FixSkills from './fix/FixSkills/FixSkills';
import Skills from './infor/Skills/Skills';
// import Info from '../layout/info/Info';
import FixExperience from './fix/FixExperience/FixExperience';
import Experience from './infor/Experience/Experience';
import Education from './infor/Education/Education';
import FixEducation from './fix/FixEducation/FixEducation';
import LanguageSkills from './infor/LanguageSkills/LanguageSkills';

// Service
import FixLanguageSkills from './fix/FixLanguageSkills/FixLanguageSkills';
// import moveScrollBar from '../../assets/js/moveScroll';
import { moveScroll } from '../../../utils/moveScroll';
import { POST, PUT } from '../../../const/method';

interface IProps {
    personalInfo?: any;
}

interface IState {
    profileState?: {
        person?: boolean,
        description?: boolean,
        skills?: boolean,
        langugeSkills?: boolean,
        experiences?: boolean,
        education?: boolean,
    },
    loading?: boolean;
}

class Profile extends Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            profileState: {
                person: false,
                description: false,
                skills: false,
                langugeSkills: false,
                experiences: false,
                education: false,
            },
            loading: true
        }
    }

    icon_user = <i className="fa fa-user" />;
    icon_list = <i className="fa fa-list" aria-hidden="true" />;
    icon_star = <i className="fa fa-star" aria-hidden="true" />;
    icon_tower = <i className="fa fa-home" aria-hidden="true" />;
    icon_bachelor = <i className="fa fa-graduation-cap" aria-hidden="true" />;
    icon_solid_star = <i className="fa fa-star" />;
    icon_regular_star = <i className="fa fa-star" />;

    async componentDidMount() {
        await this.setState({ loading: false });
        // console.log(this.props.personalInfo)
    }

    _fixData = (id) => {
        let { personalInfo } = this.props;
        let { profileState } = this.state;
        let param = id;
        profileState[param] = !profileState[param];
        this.setState({ profileState });

        let l_ls = personalInfo.languageSkill ? personalInfo.languageSkill.length : 0;
        let l_ex = personalInfo.experiences ? personalInfo.experiences.length : 0;
        let l_ed = personalInfo.educations ? personalInfo.educations.length : 0;
        let l_sk = personalInfo.skills ? personalInfo.skills.length : 0;

        let h_ls = 0;
        let h_ex = 0;
        let h_ed = 0;
        let h_sk = 0;

        if (l_ls > 0) {
            h_ls = 400;
        }

        if (l_ex > 0) {
            h_ex = 250;
        }

        if (l_ed > 0) {
            h_ed = 250;
        }

        if (l_ed > 0) {
            h_sk = 50;
        }

        let p_ls = l_ls * h_ls;
        let p_ed = l_ed * h_ed;
        let p_ex = l_ex * h_ex;
        let p_sk = l_sk * h_sk / 3;

        switch (param) {
            case 'person':
                moveScroll(80, 0, true);
                break;

            case 'description':
                moveScroll(600, 0, true);
                break;

            case 'skills':
                moveScroll(880, 0, true);
                break;

            case 'languageSkill':
                moveScroll(880 + 300 + p_sk + p_ls, 0, true);
                break;

            case 'experience':
                moveScroll(880 + 260 * 2 + p_sk + p_ls + p_ex, 0);
                break;
            case 'education':

                moveScroll(980 + 450 * 3 + p_sk + p_ls * p_ex + p_ed, 0);
                break;
            default:
                break;
        }
    }

    render() {
        let { profileState } = this.state;
        return (
            <Layout disableFooterData={false}>
                <div className="content">
                    <Row className='profile'>
                        {/* Profile */}
                        <Col xs={24} sm={24} md={18} lg={18} xl={16} xxl={20} className='block-info'>
                            <Block describe='Thông tin cá nhân' icon={this.icon_user} >
                                <div className='icon-fix' onClick={() => this._fixData('person')}>
                                    <span data-tip
                                        data-for='f_p_i'
                                        className="fa fa-pencil"
                                    >
                                    </span>
                                </div>
                                {profileState['person'] ? <FixShortProfile _fixData={this._fixData} /> : <ShortProfile />}
                            </Block >
                            {/* Description */}
                            <Block describe='Mô tả bản thân' icon={this.icon_list} >
                                <div className='icon-fix' onClick={() => this._fixData('description')}>
                                    <span
                                        data-tip data-for='f_d_i'
                                        id='description'
                                        className="fa fa-pencil"
                                    >
                                    </span>
                                </div>
                                {profileState['description'] ? <FixDescription _fixData={this._fixData} method={PUT} /> : <Description />}
                            </Block >

                            {/* Skill */}
                            <Block describe='Kỹ năng chuyên nghành' icon={this.icon_star}   >
                                <div className='icon-fix' onClick={() => this._fixData('skills')}>
                                    <span data-tip data-for='a_s'
                                        id='skills'
                                        className="fa fa-pencil"
                                    >
                                    </span>
                                </div>
                                {profileState['skills'] ? <FixSkills _fixData={this._fixData} /> : <Skills />}
                            </Block >

                            {/* Language Skills */}
                            <Block describe='Ngoại ngữ' icon={this.icon_list}  >
                                <div className='icon-fix' onClick={() => this._fixData('languageSkill')}>
                                    <span
                                        data-tip data-for='a_ls'
                                        id='languageSkill'
                                        className="fa fa-plus"
                                        // color="#595959"
                                    ></span>
                                </div>
                                <LanguageSkills />
                                {profileState['languageSkill'] ? <FixLanguageSkills _fixData={this._fixData} method={POST} /> : null}
                            </Block >

                            {/* Experience */}
                            <Block describe='Kinh nghiệm làm việc' icon={this.icon_tower}  >
                                <div className='icon-fix' onClick={() => this._fixData('experience')}>
                                    <span
                                        data-tip data-for='a_ex'
                                        id='experience'
                                        className="fa fa-plus"
                                    >
                                    </span>
                                </div>
                                <Experience />
                                {profileState['experience'] ? <FixExperience _fixData={this._fixData} method={POST} /> : null}
                            </Block >

                            {/* Education */}
                            <Block describe='Học vấn và bằng cấp' icon={this.icon_bachelor}>
                                <div className='icon-fix' onClick={() => this._fixData('education')}>
                                    <span
                                        data-tip data-for='a_ed'
                                        id='education'
                                        className="fa fa-plus"
                                    >
                                    </span>
                                </div>
                                <Education />
                                {profileState['education'] ? <FixEducation _fixData={this._fixData} method={POST} /> : null}
                            </Block >
                            {/* ShortProfileal Info */}
                        </Col>
                        {/* Comment */}
                        <Col xs={24} sm={24} md={6} lg={6} xl={8} xxl={4} className='candicate-info '>
                            {/* <div>
                                <p>
                                    <label>THÁI ĐỘ</label>
                                </p>
                                <p>
                                    <label>KĨ NĂNG</label>
                                </p>
                                <p>
                                    <label>HÀI LÒNG</label>
                                </p>

                            </div> */}
                        </Col>
                    </Row>
                </div>
            </Layout >
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isAuthen: state.AuthState.isAuthen,
        personalInfo: state.PersonalInfo,
    }
}

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
