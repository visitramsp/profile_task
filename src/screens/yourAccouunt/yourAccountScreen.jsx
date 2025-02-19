import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { ArrowLeft } from '../../assets/icon';
import styles from './yourAccountScreen.style';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ImageCropPicker from 'react-native-image-crop-picker';
import { Colors } from '../../theme';
import Icon from 'react-native-vector-icons/Entypo';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, '8+ characters, 1 uppercase, 1 number')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  username: Yup.string().required('Username is required'),
  profile: Yup.mixed()
});
export default function YourAccountScreen() {
  const navigation = useNavigation();
  const [securePassword, setSecurePassword] = useState(false);
  const [values, setValues] = useState({
    name: 'Jo sew',
    email: 'josew@example.com',
    password: 'Jo@23948',
    username: 'jondfskj',
    profile: ''
  });
  const [status, setStatus] = useState({
    nameStatus: false,
    emailStatus: false,
    passwordStatus: false,
    userNameStatus: false,
    towFactorStatus: false
  });

  const handleChangeStatus = (field) => {
    setStatus((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  console.log(values, 'values');

  const selectPhoto = (setFieldValue) => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: false,
      cropperCircleOverlay: true,
      avoidEmptySpaceAroundImage: true,
      freeStyleCropEnabled: true
    }).then((image) => {
      setFieldValue('profile', image);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft />
        </TouchableOpacity>
        <Text style={styles.heading}>Your Account</Text>
      </View>

      <Formik
        initialValues={{ profile: values.profile }}
        validationSchema={validationSchema.pick(['profile'])}
        onSubmit={(formValues) => {
          setValues({ ...values, profile: formValues.profile });
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <>
            <View style={styles.mainProfileView}>
              <TouchableOpacity
                style={styles.profileView}
                onPress={() => selectPhoto(setFieldValue)}
              >
                {values?.profile?.path && (
                  <Image
                    source={{
                      uri: values?.profile?.path ? values?.profile?.path : ''
                    }}
                    style={styles.profileImage}
                  />
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.btnView}>
              <Text style={styles.btnText}>Upload Photo</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

      <View>
        {/* <View style={styles.accountMainView}></View> */}

        <View style={styles.horizontalLine} />

        <View style={[!status.nameStatus && styles.fieldView]}>
          <View>
            <Text style={styles.label}>Name</Text>
            {!status.nameStatus && (
              <Text style={styles.outputText}>{values.name}</Text>
            )}
          </View>
          {!status.nameStatus && (
            <TouchableOpacity style={styles.editBtn}>
              <Text
                onPress={() => handleChangeStatus('nameStatus')}
                style={styles.editText}
              >
                Edit
              </Text>
            </TouchableOpacity>
          )}

          {status.nameStatus && (
            <Formik
              initialValues={{ name: values.name }}
              validationSchema={validationSchema.pick(['name'])}
              onSubmit={(formValues) => {
                setValues({ ...values, name: formValues.name });
                handleChangeStatus('nameStatus');
              }}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <>
                  <View style={styles.inputFieldView}>
                    <TextInput
                      placeholder="Enter Name"
                      style={[
                        styles.input,
                        touched.name &&
                          errors.name && { borderColor: Colors.red }
                      ]}
                      value={values.name}
                      onChangeText={handleChange('name')}
                    />

                    <TouchableOpacity
                      style={styles.editBtn}
                      onPress={() => handleChangeStatus('nameStatus')}
                    >
                      <Text style={styles.editText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.editBtn, { backgroundColor: 'black' }]}
                      onPress={handleSubmit}
                    >
                      <Text style={[styles.editText, { color: 'white' }]}>
                        Save
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {touched.name && errors.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}
                </>
              )}
            </Formik>
          )}
        </View>

        {/* email */}
        <View style={styles.horizontalLine} />
        <View style={[!status.emailStatus && styles.fieldView]}>
          <View>
            <Text style={styles.label}>Email</Text>
            {!status.emailStatus && (
              <Text style={styles.outputText}>{values.email}</Text>
            )}
          </View>
          {!status.emailStatus && (
            <TouchableOpacity style={styles.editBtn}>
              <Text
                onPress={() => handleChangeStatus('emailStatus')}
                style={styles.editText}
              >
                Edit
              </Text>
            </TouchableOpacity>
          )}
          {status.emailStatus && (
            <Formik
              initialValues={{ email: values.email }}
              validationSchema={validationSchema.pick(['email'])}
              onSubmit={(formValues) => {
                setValues({ ...values, email: formValues.email });
                handleChangeStatus('emailStatus');
              }}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <>
                  <View style={styles.inputFieldView}>
                    <TextInput
                      placeholder="Enter email"
                      style={[
                        styles.input,
                        [
                          touched.email &&
                            errors.email && { borderColor: Colors.red }
                        ]
                      ]}
                      value={values.email}
                      onChangeText={handleChange('email')}
                    />

                    <TouchableOpacity
                      style={styles.editBtn}
                      onPress={() => handleChangeStatus('emailStatus')}
                    >
                      <Text style={styles.editText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.editBtn, { backgroundColor: 'black' }]}
                      onPress={handleSubmit}
                    >
                      <Text style={[styles.editText, { color: 'white' }]}>
                        Save
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </>
              )}
            </Formik>
          )}
        </View>

        {/* password */}
        <View style={styles.horizontalLine} />
        <View style={[!status.passwordStatus && styles.fieldView]}>
          <View>
            <Text style={styles.label}>Password</Text>
            {!status.passwordStatus && (
              <Text style={styles.outputText}>{values.password}</Text>
            )}
          </View>
          {!status.passwordStatus && (
            <TouchableOpacity style={styles.editBtn}>
              <Text
                onPress={() => handleChangeStatus('passwordStatus')}
                style={styles.editText}
              >
                Update
              </Text>
            </TouchableOpacity>
          )}
          {status.passwordStatus && (
            <Formik
              initialValues={{ password: values.password }}
              validationSchema={validationSchema.pick(['password'])}
              onSubmit={(formValues) => {
                setValues({ ...values, password: formValues.password });
                handleChangeStatus('passwordStatus');
              }}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <>
                  <View style={styles.inputFieldView}>
                    <View
                      style={[
                        styles.passView,
                        [
                          touched.password &&
                            errors.password && { borderColor: Colors.red }
                        ]
                      ]}
                    >
                      <TextInput
                        placeholder="Enter password"
                        style={[styles.input, styles.passInput]}
                        secureTextEntry={securePassword ? false : true}
                        value={values.password}
                        onChangeText={handleChange('password')}
                      />
                      <TouchableOpacity
                        onPress={() => setSecurePassword(!securePassword)}
                      >
                        {securePassword ? (
                          <Icon name="eye" size={20} color={Colors.black} />
                        ) : (
                          <Icon
                            name="eye-with-line"
                            size={20}
                            color={Colors.gray}
                          />
                        )}
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={styles.editBtn}
                      onPress={() => handleChangeStatus('passwordStatus')}
                    >
                      <Text style={styles.editText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.editBtn,
                        { backgroundColor: Colors.black }
                      ]}
                      onPress={handleSubmit}
                    >
                      <Text style={[styles.editText, { color: Colors.white }]}>
                        Save
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </>
              )}
            </Formik>
          )}
        </View>

        {/* userName */}
        <View style={styles.horizontalLine} />
        <View style={[!status.userNameStatus && styles.fieldView]}>
          <View>
            <Text style={styles.label}>Username</Text>
            {!status.userNameStatus && (
              <Text style={styles.outputText}>{values.username}</Text>
            )}
          </View>
          {!status.userNameStatus && (
            <TouchableOpacity style={styles.editBtn}>
              <Text
                onPress={() => handleChangeStatus('userNameStatus')}
                style={styles.editText}
              >
                Update
              </Text>
            </TouchableOpacity>
          )}
          {status.userNameStatus && (
            <Formik
              initialValues={{ username: values.username }}
              validationSchema={validationSchema.pick(['username'])}
              onSubmit={(formValues) => {
                setValues({ ...values, username: formValues.username });
                handleChangeStatus('userNameStatus');
              }}
            >
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <>
                  <View style={styles.inputFieldView}>
                    <TextInput
                      placeholder="Enter username"
                      style={[
                        styles.input,
                        [
                          touched.username &&
                            errors.username && { borderColor: Colors.red }
                        ]
                      ]}
                      value={values.username}
                      onChangeText={handleChange('username')}
                    />

                    <TouchableOpacity
                      style={styles.editBtn}
                      onPress={() => handleChangeStatus('userNameStatus')}
                    >
                      <Text style={styles.editText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.editBtn, { backgroundColor: 'black' }]}
                      onPress={handleSubmit}
                    >
                      <Text style={[styles.editText, { color: 'white' }]}>
                        Save
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {touched.username && errors.username && (
                    <Text style={styles.errorText}>{errors.username}</Text>
                  )}
                </>
              )}
            </Formik>
          )}
        </View>

        {/* Tow-Factor acuthontication */}
        <View style={styles.horizontalLine} />

        <View style={styles.fieldView}>
          <View>
            <Text style={[styles.label, { width: 109 }]}>
              Two-Factor {'  '} Authentication
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleChangeStatus('towFactorStatus')}
            style={styles.editBtn}
          >
            <Text style={styles.editText}>
              Turn {status?.towFactorStatus ? 'on' : 'of'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine} />
      </View>

      {/* delete your account */}
      <View style={styles.fieldView}>
        <View>
          <Text style={[styles.label]}>Delete your account</Text>
          <Text style={[styles.desc]}>
            Once you delete your account, all your data will be permanently
            erased and cannot be recovered. If you’re having issues, feel free
            to contact us first!
          </Text>

          <TouchableOpacity style={styles.deleteView}>
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
