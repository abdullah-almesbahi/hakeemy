import { _post, _get, _put, _delete, _post_multipart } from './request';
import { firebase } from '../containers/App';
import { GOOGLE_MAP_KEY } from './constants';
// import { RequestLessonType } from '../../containers/HomeStudentPage/types';

const API = {
  getHospital(hospital_id: number) {
    return _get(`/patient/viewhospital/${hospital_id}/0`, {}, false);
  },
  nearHospital(lat_long: string, limit: number = 50, offset: number = 1) {
    return _get(
      `/patient/searchhospital`,
      {
        params: {
          lat_long,
          limit,
          offset
        }
      },
      false
    );
  },
  postLogin(email, password) {
    return _post(
      `/patient/login`,
      {
        email,
        password
      },
      false
    );
  },
  postVerifyAppointments(values) {
    return _post(
      `/patient/verifyappointments`,
      {
        ...values
      },
      false
    );
  },
  postDeleteSchedule(values) {
    return _post(
      `/appointment/deleteschedule`,
      {
        ...values
      },
      false
    );
  },
  postApproveAppointment(values) {
    return _post(
      `/appointment/approveappointment`,
      {
        ...values
      },
      false
    );
  },
  postDeleteAppointment(values) {
    return _post(
      `/appointment/deleteappointment`,
      {
        ...values
      },
      false
    );
  },
  postHospitalLogin(email, password) {
    return _post(
      `/hospital/login`,
      {
        email,
        password
      },
      false
    );
  },
  postPatientRegister(values) {
    return _post(
      `/patient/create`,
      {
        ...values
      },
      false
    );
  },
  postHospitalRegister(data) {
    return _post_multipart(`/hospital/create`, data, false);
  },
  postPatientUpdate(values) {
    return _post(
      `/patient/update`,
      {
        ...values
      },
      false
    );
  },
  postHospitalUpdate(values) {
    return _post(
      `/hospital/update`,
      {
        ...values
      },
      false
    );
  },
  bookAppointment(values) {
    return _post(
      `/patient/createappointment`,
      {
        ...values
      },
      false
    );
  },
  postDoctorCreate(values) {
    return _post_multipart(`/doctor/create`, values, false);
  },
  getSearchDoctor(data) {
    return _get(
      `/patient/searchdoctor`,
      {
        params: {
          ...data
        }
      },
      false
    );
  },
  getListappointments(api_key) {
    return _get(
      `/appointment/listappointments`,
      {
        params: {
          api_key
        }
      },
      false
    );
  },
  getMyAppointments(api_key) {
    return _get(
      `/patient/history`,
      {
        params: {
          api_key
        }
      },
      false
    );
  },
  getDoctorsSchedules(api_key) {
    return _get(
      `/appointment/listschedule`,
      {
        params: {
          api_key
        }
      },
      false
    );
  },
  getListOfDoctorsForHospital(api_key) {
    return _get(
      `/doctor/list`,
      {
        params: {
          api_key
        }
      },
      false
    );
  },
  getDoctorProfile(id) {
    return _get(
      `/patient/viewdoctor/${id}/0`,
      {
        params: {}
      },
      false
    );
  },
  registerVisitor() {
    return _get(
      `/home/visitor`,
      {
        params: {}
      },
      false
    );
  },
  getCountry() {
    return _get(
      `/admin/country`,
      {
        params: {}
      },
      false
    );
  },
  getCity() {
    return _get(
      `/admin/city`,
      {
        params: {}
      },
      false
    );
  },
  getInsurance() {
    return _get(
      `/admin/insurance`,
      {
        params: {}
      },
      false
    );
  },
  postForgot(email) {
    return _post(
      `/patient/forgot`,
      {
        email
      },
      false
    );
  },
  postAddschedule(data) {
    return _post(
      `/appointment/addschedule`,
      {
        ...data
      },
      false
    );
  },
  postHospitalForgot(email) {
    return _post(
      `/hospital/forgot`,
      {
        email
      },
      false
    );
  },
  getHospitalbyname(name, language) {
    return _get(
      `/patient/hospitalbyname`,
      {
        params: { name, language }
      },
      false
    );
  },
  getSpecialityByName(hospitalName) {
    return _get(
      `/patient/specialitybyname`,
      {
        params: { hospitalName }
      },
      false
    );
  },
  getDoctorbyname(doctorlName) {
    return _get(
      `patient/doctorbyname`,
      {
        params: { doctorlName }
      },
      false
    );
  },

  getSuggestLocations(text) {
    return _get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json`,
      {
        params: {
          input: text,
          types: 'geocode',
          language: 'en',
          key: GOOGLE_MAP_KEY
        }
      },
      false
    );
  },
  getSuggestSearch(text) {
    return _get(`api/search/${text}`, {}, false);
  },
  callContactUs(name, email, phone, message) {
    return _post(`/home/contactus`, {
      name,
      email,
      phone,
      message
    });
  },

  ///////////////////

  getCountryCodes(mobile, user_type) {
    return _get(`/common/country-codes`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  checkPromoCodeApplied(mobile, user_type) {
    return _get(`/invite-promo/is-promocode-applied`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * Sent OTP code to user mobile number
   *
   * On Success ,  Response will be
   * {
   *    data: {otp: 8160 , user_id: 4216 },
   *    message: "Registration successful",
   *    status: true
   * }
   *   ["api_version": "1.0",
   * "app_version_code": 1.0,
   *  "device_token": "40EFD1D3-4D04-4B09-8ACD-CCBECED536D2",
   * "device_version": "12.2",
   * "country_code_id": 2,
   *  "device_name": "iPhone X",
   * "device_type": "iOS",
   * "mobile_no": 503000074,
   *  "fcm_id": dXg5WPa6274:APA91bG-Hx6QNR_ulOO8OgzO2oXu_C4U84Fs7tfQTRr8PpKP39JSdxUI2M7FQ6aiZSzdwc5BJjhiQuIXjRKdv2G806vQNVYs8Mmh3B6UxnWAq0ka6J0UexJMdttUFsowEcgUK8EZ5A-d,
   * "user_type": "1"]
   *
   * Resend OTP
   *
   * ["api_version": "1.0",
   * "device_name": "iPhone X",
   *  "mobile_no": 503000074,
   *  "fcm_id": dXg5WPa6274:APA91bG-Hx6QNR_ulOO8OgzO2oXu_C4U84Fs7tfQTRr8PpKP39JSdxUI2M7FQ6aiZSzdwc5BJjhiQuIXjRKdv2G806vQNVYs8Mmh3B6UxnWAq0ka6J0UexJMdttUFsowEcgUK8EZ5A-d,
   * "device_version": "12.2",
   * "app_version_code": 1.0,
   * "device_type": "iOS",
   *  "user_type": "1",
   * "country_code_id": 2,
   * "device_token": "40EFD1D3-4D04-4B09-8ACD-CCBECED536D2",
   *  "user_id": 4216]
   * Server Response on success :
   *    data: {otp: 8160 , user_id: 4216 }
   *    message: "Registration successful"
   *    status: true
   *
   * @param  {number} mobile The mobile of the user
   * @param  {number} user_type The tyoe of the user, Teacher or student
   */
  sendOtp(mobile, user_type) {
    return _post(`/auth/send-otp`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * Verify the OTP code is correct
   *
   * On Success ,  Response will be
   * {
   *  data : {
   *    "access_token" = c26072a8d0b85185e53d3712b143e94af157adb6;
   *    email = "<null>";
   *    "invitation_code" = QCMTqv;
   *    "mobile_no" = 503000074;
   *    "user_id" = 4216;
   *     username = 503000074;
   *  },
   *  message : "listed successfully",
   *  status : 1
   * }
   *
   * @param {number} username The Mobile numbder of user , ex  : 503000074
   * @param {number} password The OTP Code , ex : 8160
   * @param {number} user_type The Type of user , 1 = teacher , 2 = student
   * @param {string} [client_id="testclient"]
   * @param {string} [client_secret="testpass"]
   * @param {string} [grant_type="password"]
   * @returns
   */
  verifyOtp(
    username,
    password,
    user_type,
    client_id = 'testclient',
    client_secret = 'testpass',
    grant_type = 'password'
  ) {
    return _post(`/auth/verify-otp`, {
      username,
      password,
      user_type,
      client_id,
      client_secret,
      grant_type
    });
  },

  /**
   * Get teacher personal infomation based on step
   *
   * @returns
   */
  getTeacherPersonalInfo() {
    return _get(
      `/signup/get-teacher-personalinfo`,
      {
        params: {
          register_step: 'all'
        }
      },
      true
    );
  },

  /**
   * Save teacher personal infomation based on step
   *
   * @param {*} data
   * @returns
   */
  setTeacherPersonalInfo(data) {
    return _post(
      `/signup/teacher-personalinfo`,
      {
        ...data,
        register_step: 'all'
      },
      true
    );
  },

  /**
   * Upload documents for teacher registration process
   *
   * @param {formData} formData
   * @returns
   */
  uploadDocument(data) {
    return _post_multipart(
      `/signup/upload-documents`,
      {
        data
      },
      true
    );
  },
  saveUserLocation(mobile, user_type) {
    return _post(`/signup/user-location`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  saveUserLocationRange(mobile, user_type) {
    return _post(`/signup/user-range`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * update user teaching location eg. student home, teacher home
   *
   * @param {Boolean} is_teacher_home
   * @param {Boolean} is_student_home
   * @returns
   */
  setTeachingLocation(is_teacher_home, is_student_home) {
    return _put(`/signup/teaching-location`, {
      is_teacher_home,
      is_student_home
    });
  },

  /**
   * get user teaching location based selection
   *
   * @returns
   */
  getTeachingLocation() {
    return _get(`/signup/get-teaching-location`, {}, true);
  },
  getEducationInfo(mobile, user_type) {
    return _get(`/signup/get-educational-information`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * get user educatinal infomation based on step
   *
   * @param {number} education_information_id
   * @returns
   */
  getNewEducationInfo(education_information_id) {
    return _get(
      `/signup/get-new-educational-information`,
      { params: { education_information_id } },
      true
    );
  },

  // setEducationInfo(data) {
  //   return _post(`/signup/educational-information`, {

  //       "educational_type_id": "1",
  //       "class_id": "1",
  //       "subject_id": "1",
  //       "university_id": "1",
  //       "college_id": "1",
  //       "major_id": "1",
  //       "level_id": "1",
  //       "type_education_id": "1",
  //       "education_information_id": "1"

  //     mobile_no: mobile,
  //     user_type: user_type
  //   });
  // },

  /**
   * save new user educatinal infomation based on step
   *
   * @param {number} [education_information_id=null]
   * @param {number} item_id
   * @returns
   */
  setNewEducationInfo(education_information_id = null, item_id) {
    return _post(
      `/signup/new-educational-information`,
      {
        education_information_id,
        item_id
      },
      true
    );
  },
  getRegisterStep(mobile, user_type) {
    return _get(`/signup/get-register-step`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  getEducationList(mobile, user_type) {
    return _get(`/signup/educational-list`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * get educational list
   *
   * @returns
   */
  getNewEducationList() {
    return _get(`/signup/new-educational-list`, {}, true);
  },

  getUserLocation(mobile, user_type) {
    return _get(`/signup/get-location`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * get user teaching types based selection
   *
   * @returns
   */
  getTeachingType() {
    return _get(`/signup/get-teaching-types`, {}, true);
  },

  /**
   * update user teaching type eg. individual or/and student group
   *
   * @param {boolean} is_individual
   * @param {boolean} is_student_group
   * @returns
   */
  setTeachingType(is_individual, is_student_group) {
    return _put(`/signup/teaching-types`, {
      is_individual,
      is_student_group
    });
  },
  getClasses(mobile, user_type) {
    return _get(`/common/classes`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  getUniversities(mobile, user_type) {
    return _get(`/common/universities`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  getTypeOfEducations(mobile, user_type) {
    return _get(`/common/typeof-educations`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  getColleges(mobile, user_type) {
    return _get(`/common/colleges`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  getMajors(mobile, user_type) {
    return _get(`/common/majors`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  getLevels(mobile, user_type) {
    return _get(`/common/levels`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  getSubjects(mobile, user_type) {
    return _get(`/common/subjects`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  setOtherEducation(mobile, user_type) {
    return _post(`/signup/other-educational`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * save get user educatinal infomation based on step
   *
   * @param {*} parent_id
   * @param {*} item_name
   * @returns
   */
  setOtherNewEducation(parent_id, item_name) {
    return _post(
      `/signup/other-new-educational`,
      {
        parent_id,
        item_name
      },
      true
    );
  },

  /**
   *                     locationData.put("current_latitude", String.valueOf(latitude));
                    locationData.put("current_longitude", String.valueOf(longitude));
   *
   * @param {*} mobile
   * @param {*} user_type
   * @returns
   */
  updateLocation(mobile, user_type) {
    return _post(`/user/update-location`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * Update language
   *
   * @param {string} language
   * @returns
   */
  changeLanguage(lang) {
    return _post(`/user/update-language`, {}, true, { lang });
  },
  startLesson(mobile, user_type) {
    return _put(`/lessons/start-lesson`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * Go online or offline
   *
   * @param {*} is_online
   * @returns
   */
  goOnline(is_online: boolean) {
    return _put(`/user/go-online`, {
      is_online
    });
  },

  /**
   * Get teacher today lesson with distace maping
   *
   * @returns
   */
  todayLesson() {
    return _get(`/user/today-lesson`, {}, true, response => {
      if (
        response.data.status === false &&
        response.data.message &&
        response.data.top_setting
      ) {
        return response.data;
        // throw new Error(response.data.message);
      } else if (response.data.status === false) {
        throw new Error('Error response with no message');
      }
    });
  },

  /**
   * Cancel lesson based on lesson_id
   *
   * @param {number} lesson_id ex: 12
   * @param {string} firebase_lesson_id ex: -LBVO-6qo40zCptuKAu8
   * @param {number} firebase_lesson_date ex: 1526688000000
   * @returns
   */
  cancelLesson(lesson_id = false, firebase_lesson_id, firebase_lesson_date) {
    return _put(
      `/lessons/cancel-lesson`,
      {
        lesson_id,
        firebase_lesson_id,
        firebase_lesson_date
      },
      true
    );
  },
  endLesson(mobile, user_type) {
    return _put(`/lessons/end-lesson`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  requestedStudents(mobile, user_type) {
    return _get(`/user/requested-studnets`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  getDocumentStatus(mobile, user_type) {
    return _get(`/signup/get-document`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * get all uploaded documents for teacher registration process
   *
   * @returns
   */
  getAllDocumentStatus() {
    return _get(`/signup/get-all-document`, {}, true);
  },
  acceptLessons(mobile, user_type) {
    return _post(`/signup/get-document`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * Check setting tab validation
   *
   * @returns
   */
  getSettingStatus() {
    return _get(`/signup/setting-validation`, {}, true);
  },
  getRemainingTime(mobile, user_type) {
    return _get(`/common/get-time-diff`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  getLogout(mobile, user_type) {
    return _get(`/common/logout`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  adjustPending(mobile, user_type) {
    return _get(`/signup/adjust-pending`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * Delete Education Information details by educational information id
   *
   * @param {*} education_information_id
   * @returns
   */
  deleteEducationInfo(education_information_id) {
    return _delete(
      `/signup/delete-educational-information`,
      {
        params: {
          education_information_id
        }
      },
      true
    );
  },
  getBanks(mobile, user_type) {
    return _get(`/payments/get-banks`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   *  Schedule lesson from teacher application
   *
   * @param {*} data
   * @returns
   */
  requestScheduledLesson(data) {
    return _post(
      `/common/schedule-lesson`,
      {
        ...data
      },
      true
    );
  },
  cancelBookedLesson(mobile, user_type) {
    return _put(`/lessons/cancel-lesson`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /*
   * Get all teacher invoices
   *
   * @param {number} [offset=0]
   * @param {number} [limit=10]
   * @returns {Array}
   */
  getTeacherHistory(offset = 0, limit = 10) {
    return _get(
      `/payments/teacher-orders`,
      {
        params: {
          offset,
          limit
        }
      },
      true
    );
  },

  /**
   * Get All Notofications
   * 
   * On Success :
   * [
    {
      "notification_id": "6097",
      "recipient_id": "1179",
      "title": "تنورونا على الانستقرام",
      "message": {
        "title": "تنورونا على الانستقرام",
        "description": "https://www.instagram.com/telmeethapp",
        "image_url": ""
      },
      "is_read": "1",
      "created_at": "2019-03-21 02:37:20",
      "notification_type": null,
      "description": "https://www.instagram.com/telmeethapp",
      "image_url": "",
      "is_previous": false
    }
   *
   * @param {number} [offset=0]
   * @param {number} [limit=10]
   * @returns {Array} 
   */
  getNotifications(offset = 0, limit = 10) {
    return _get(
      `/notification/all-notifications`,
      {
        params: {
          offset,
          limit
        }
      },
      true
    );
  },

  /**
   * Get youe invitaion details
   *
   * @returns
   */
  getInvitations() {
    return _get(`/invite-promo/your-invitations`, {}, true);
  },
  getBankDetails(mobile, user_type) {
    return _get(`/payments/get-payment`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  postPayment(mobile, user_type) {
    return _post(`/payments/payment`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * Get teacher subject list based on hours
   *
   * @returns
   */
  getTeacherSubjects() {
    return _get(`/user/teacher-subjects`, {}, true);
  },

  /**
   * Get teacher certificates download URL
   *
   * @param {*} subject_ids
   * @returns
   */
  getDownloadCertificateUrls(subject_ids) {
    return _get(
      `/user/download-cretificate`,
      {
        params: {
          subject_ids
        }
      },
      true
    );
  },
  acceptPayment(mobile, user_type) {
    return _put(`/lessons/received-payment`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  setLocationUpdates(mobile, user_type) {
    return _post(`/user/update-location`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  getLocation(mobile, user_type) {
    return _get(`/user/teacher-student-location`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  setOnMyWay(mobile, user_type) {
    return _post(`/notification/on-my-way`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * Display Menu details based on user
   *
   * @returns
   */
  getMenuUserData() {
    return _get(`/common/menu`, {}, true);
  },

  /**
   * Delete Notification
   *
   * @param {number} notification_id the id of notification to delete
   * @returns
   */
  deleteNotification(notification_id) {
    return _delete(`/notification/delete-notification`, {
      params: { notification_id }
    });
  },
  /**
   * Get student personal infomation based on step
   *
   * @returns
   */
  getStudentPersonalInfo() {
    return _get(
      `/signup/student-personal-info`,
      {
        params: {
          register_step: 'all'
        }
      },
      true
    );
  },
  /**
   * Save student personal infomation based on step
   *
   * @param {*} data
   * @returns
   */
  setStudentPersonalInfo(data) {
    return _post(
      `/signup/student-info`,
      {
        ...data,
        register_step: 'all'
      },
      true
    );
  },
  getStudentPersonalInfoList(mobile, user_type) {
    return _get(`/signup/get-student-info-list`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },

  /**
   * get subject list based on student id
   *
   * @param {string} search_type ex : Now
   * @param {number} student_id ex: 1195
   * @param {number} student_count ex: 1
   * @returns
   */
  getSubjectList(search_type, student_id, student_count) {
    return _get(
      `/search/get-subject-list`,
      {
        params: {
          search_type,
          student_id,
          student_count
        }
      },
      true
    );
  },
  /**
   * Search teacher for request lesson
   *
   * @param {string} search_type ex : Now
   * @param {number} subject_id ex: 45
   * @param {number} student_id ex: 1195
   * @param {number} student_count ex: 1
   * @returns
   */
  getTeacherList(search_type, subject_id, student_id, student_count) {
    return _get(
      `/search/search-teacher`,
      {
        params: {
          search_type,
          subject_id,
          student_id,
          student_count
        }
      },
      true
    );
  },

  /**
   * Calculate rate and range based on teacher id
   *
   * @param {object} data
   * @returns
   */
  getRangeRate(data) {
    return _get(
      `/search/range-rate`,
      {
        params: {
          ...data
        }
      },
      true
    );
  },
  requestLesson(data: RequestLessonType) {
    return _post(
      `/notification/request-lesson`,
      {
        ...data
      },
      true
    );
  },

  /**
   * Send notification to teacher for cancel lesson
   *
   * @param {number} notification_id
   * @param {number} recipient_id
   * @returns
   */
  cancelRequestLesson(notification_id: number, recipient_id: number) {
    return _post(
      `/notification/cancel-lesson-request`,
      {
        notification_id,
        recipient_id
      },
      true
    );
  },

  /**
   * teacher_id
   *
   * @param {number} teacher_id
   * @returns
   */
  likeTeacher(teacher_id) {
    return _post(
      `/user/like-teacher`,
      {
        teacher_id
      },
      true
    );
  },
  /*
   * Get all student invoices
   *
   * @param {number} [offset=0]
   * @param {number} [limit=10]
   * @returns {Array}
   */
  getStudentHistory(offset = 0, limit = 10) {
    return _get(
      `/payments/student-orders`,
      {
        params: {
          offset,
          limit
        }
      },
      true
    );
  },
  getLessonDetails(mobile, user_type) {
    return _get(`/payments/student-orders`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  sendPromoCode(mobile, user_type) {
    return _post(`/invite-promo/apply-promo-code`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  synData(mobile, user_type) {
    return _post(`/lessons/get-firebase-data`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  getScheduledDates(mobile, user_type) {
    return _get(`/lessons/lesson-by-month`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  getLessonByTeacher(mobile, user_type) {
    return _get(`/lessons/lesson-by-teacher`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  rateTeacher(mobile, user_type) {
    return _post(`/user/rate-teacher`, {
      mobile_no: mobile,
      user_type: user_type
    });
  },
  /**
   * Get All Root Items
   *
   *
   * @param {number} [offset=0]
   * @param {number} [limit=10]
   * @returns {Array}
   */
  getRootItems() {
    return _get(`/item/roots`, {}, true);
  },
  getChildItems(parent_id) {
    return _get(`/item/childrens`, { params: { parent_id } }, true);
  },

  async getTeacherScheduls(teacher_id) {
    return await firebase
      .database()
      .ref('/Teachers/' + teacher_id)
      .once('value');
    // return;
    // .then(function(snapshot) {
    //   snapshot.forEach(function(childSnapshot) {
    //     var childKey = childSnapshot.key;
    //     console.log('childKey', childKey);
    //     var childData = childSnapshot.val();
    //     console.log('childData', childData);
    //     // ...
    //   });
    //   // ...
    // });
  }
};

export default API;
