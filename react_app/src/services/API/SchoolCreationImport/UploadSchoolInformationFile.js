import ApiCall from '../Session/ApiCall';

export const UploadSchoolSpecializations = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileName', file.name);
  return ApiCall('post', '/school_specialization_import', formData, {
    'content-type': 'multipart/form-data'
  });
};
