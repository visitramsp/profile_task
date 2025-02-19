/* eslint-disable no-unused-vars */
/* eslint-disable complexity */
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ButtonComp, Container } from '../../../../components';
import ItemCountText from '../../../../components/headers/ItemCountText';
import ImagePickerModal from '../../../../components/vender/ImagepickerModal';
import { APP_LANGUAGE_CONSTANT } from '../../../../constants';
import { AddUserSchema } from '../../../../schemas/LoginSchema';
import {
  getUserPermissions,
  onAddSubUser,
  updateSubUser
} from '../../../../store/vendor/action';
import { verticalScale } from '../../../../theme';
import { openCamera, openGallery } from '../../../../utils/imagepicker';
import UserForm from './UserForm';
import { showError, showToastError, showToastSuccess } from '../../../../utils';

function AddUser({ route }) {
  // Optional chaining and default values to handle missing params
  const { item = {} } = route.params || {};

  const checkStatus = item?.account_status === 'activated' ? true : false;
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [permissionData, setPermissionData] = useState([]);
  const [isEmailVerify, setEmailVerify] = useState(false);
  const [isPhoneVerify, setPhoneVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState('IN');
  const [password, setPassword] = useState('');
  const [docID, setDocID] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isActive, setIsActive] = useState(checkStatus);

  useEffect(() => {
    if (item?.permission) {
      setSelectedPermissions(item?.permission);
    }
    fetchPermissions();
  }, [fetchPermissions, item?.permission]);

  const fetchPermissions = useCallback(() => {
    getUserPermissions()
      .then((res) => {
        const permissionList = res?.data?.data || [];
        setPermissionData(
          addIsSelectedKey(permissionList, item?.permission || [])
        );
        // if (item) {
        //   setPermissionData(addIsSelectedKey(permissionList, item?.permission));
        // } else {
        //   setPermissionData(permissionList);
        // }
      })
      .catch((err) => {
        showError(err);
      });
  }, [addIsSelectedKey, item?.permission]);

  // eslint-disable-next-line no-shadow
  const addIsSelectedKey = useCallback((data, selectedPermissions = []) => {
    const updatedList = data.map((e) => ({
      ...e,
      value: e.value.map((res, index) => ({
        ...res,
        isSelected: selectedPermissions.includes(res.uuid) // Changed to res.uuid to match the permission object
      }))
    }));
    return updatedList;
  }, []);

  const onSelectImage = () => {
    setVisible(true);
  };

  const captureFromCamera = async () => {
    const mediaItem = await openCamera();
    mediaItem && setImageUri(mediaItem);
    setVisible(false);
  };

  const pickFormGallery = async () => {
    const mediaItem = await openGallery();
    mediaItem && setImageUri(mediaItem?.[0]);
    setVisible(false);
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        fullname: item?.name || '',
        email: item?.email || '',
        phoneNo: item?.phone || ''
      },
      validationSchema: AddUserSchema,
      onSubmit: () => {
        if (selectedPermissions?.length === 0) {
          showToastError('Please select at least one role');
          return;
        }
        // Append form data and permissions

        const formdata = new FormData();
        appendFormDataWithPermissions(formdata, selectedPermissions, values);

        setIsLoading(true);

        if (item?.uuid !== undefined) {
          const reqBody = new FormData();
          reqBody.append('sub_user_id', item?.uuid);
          reqBody.append('name', values.fullname);
          reqBody.append(
            'account_status',
            isActive ? 'activated' : 'deactivated'
          );
          selectedPermissions.forEach((permission, index) => {
            reqBody.append(`permissions[${index}]`, permission);
          });
          if (imageUri?.path) {
            reqBody.append('profile_photo', {
              uri: imageUri?.path,
              name: imageUri?.filename || 'image.jpg',
              type: imageUri.mime || 'image/jpeg'
            });
          }
          updateSubUser(reqBody)
            .then((res) => {
              setIsLoading(false);
              showToastSuccess(res?.data?.message);
              navigation.replace('userManagement');
            })
            .catch((err) => {
              setIsLoading(false);

              showError(err);
            });
        } else {
          onAddSubUser(formdata)
            .then((res) => {
              setIsLoading(false);
              showToastSuccess(res?.data?.message);
              navigation.replace('userManagement');
            })
            .catch((err) => {
              setIsLoading(false);
              showError(err);
            });
        }
      }
    });

  const appendFormDataWithPermissions = useCallback(
    (formdata, permissions) => {
      formdata.append('name', values?.fullname);
      formdata.append('email', values?.email);
      formdata.append('phone', values?.phoneNo);
      formdata.append('country', country);
      if (imageUri?.path) {
        formdata.append('profile_photo', {
          uri: imageUri?.path,
          name: imageUri?.filename || 'image.jpg',
          type: imageUri.mime || 'image/jpeg'
        });
      }
      formdata.append('doc_id', docID);
      formdata.append('password', password);
      // Append permission array dynamically
      permissions.forEach((permission, index) => {
        formdata.append(`permission[${index}]`, permission);
      });
    },
    [
      country,
      docID,
      imageUri,
      password,
      values?.email,
      values?.fullname,
      values?.phoneNo
    ]
  );
  return (
    <Container
      title={
        item?.profile_photo
          ? t(APP_LANGUAGE_CONSTANT.UPDATE_USER_INFO)
          : t(APP_LANGUAGE_CONSTANT.ADD_USER_INFO)
      }
    >
      <ItemCountText
        title={t(APP_LANGUAGE_CONSTANT.USER_INFORMATION)}
        isnumberPresent={false}
      />
      <View style={styles.conatiner}>
        <TouchableOpacity onPress={onSelectImage}>
          <Image
            source={{
              uri: imageUri?.path
                ? imageUri?.path
                : item?.profile_photo
                ? item?.profile_photo
                : 'https://t4.ftcdn.net/jpg/06/85/70/67/360_F_685706799_hrkAM8ffiXoD5okWxwcXU29saHtekay3.jpg'
            }}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <UserForm
        permissionData={permissionData}
        setPermissionData={setPermissionData}
        isPhoneVerify={isPhoneVerify}
        setPhoneVerify={setPhoneVerify}
        isEmailVerify={isEmailVerify}
        setEmailVerify={setEmailVerify}
        password={password}
        setPassword={setPassword}
        docID={docID}
        setDocID={setDocID}
        values={values}
        errors={errors}
        touched={touched}
        selectedPermissions={selectedPermissions}
        setSelectedPermissions={setSelectedPermissions}
        handleChange={handleChange}
        handleBlur={handleBlur}
        isUpdate={item?.uuid !== undefined ? true : false}
        setIsActive={setIsActive}
        isActive={isActive}
      />
      <View style={styles.submitBtnContainer}>
        <ButtonComp
          btnTitle={
            item?.uuid !== undefined
              ? t(APP_LANGUAGE_CONSTANT.UPDATE)
              : t(APP_LANGUAGE_CONSTANT.SUBMIT)
          }
          isLoading={isLoading}
          onPress={handleSubmit}
        />
      </View>

      <View style={styles.manageSpace} />
      <ImagePickerModal
        type={''}
        isVisible={visible}
        setVisibility={setVisible}
        openCamera={captureFromCamera}
        openGallery={pickFormGallery}
      />
    </Container>
  );
}

export default AddUser;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(20)
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 20
  },
  manageSpace: {
    height: verticalScale(60)
  },
  submitBtnContainer: {
    width: '100%',
    marginTop: verticalScale(30)
  }
});
