import {ApiCategory} from '../../types';
import React, {useEffect, useState} from 'react';
import MyModal from '../MyModal/MyModal';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  clearCurrentCategory,
  closeCategoriesModal,
  selectCurrentCategory, selectEditCategoryLoading,
  selectShowCategoriesModal
} from '../../store/financeSlice';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import {createCategory, editCategory, fetchCategories} from '../../store/financeThunks';

const initialState: ApiCategory = {
  name: '',
  type: '',
};

interface Props {
  isLoading: boolean,
}

const CategoryForm: React.FC<Props> = ({isLoading}) => {
  const [formData, setFormData] = useState(initialState);
  const isShowModal = useAppSelector(selectShowCategoriesModal);
  const dispatch = useAppDispatch();
  const currentCategory = useAppSelector(selectCurrentCategory);
  const editLoading = useAppSelector(selectEditCategoryLoading);

  useEffect(() => {
    if (currentCategory) {
      setFormData({
        type: currentCategory.type,
        name: currentCategory.name,
      });
    }
  }, [currentCategory]);

  const onSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (currentCategory === null) {
        await dispatch(createCategory(formData));
        await dispatch(fetchCategories());
        dispatch(closeCategoriesModal());
      } else {
        await dispatch(editCategory({
          id: currentCategory.id,
          category: formData
        }));
        await dispatch(fetchCategories());
      }

      setFormData(initialState);
      dispatch(closeCategoriesModal());
    } catch (e) {
      console.error(e);
    }
  };

  const changeForm = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const close = () => {
    dispatch(closeCategoriesModal());
    dispatch(clearCurrentCategory());
  };

  return (
    <>
      <MyModal
        isOpen={isShowModal}
        onClose={close}
      >
        <div className="row px-5 fs-6">
          <h3 className="text-primary-emphasis text-center fs-1 mb-5">{currentCategory ? 'Edit' : 'Add'} Category</h3>
          <div className="row mt-2 justify-content-center">
            <div className=" text-primary-emphasis">
              <form onSubmit={onSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="name" className="fs-4 mb-2">Category Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    id="name"
                    name="name"
                    className="form-control border-primary fs-5 mb-3 py-2"
                    placeholder="Enter Category name"
                    onChange={changeForm}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="type" className="fs-4 mb-2">Type</label>
                  <select
                    id="type"
                    name="type"
                    className="form-select form-control border-primary fs-5 mb-4 py-2"
                    aria-label="Types"
                    value={formData.type}
                    onChange={changeForm}
                    required
                  >
                    <option value="">Select type</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>

                <div className="form-group mb-3">
                  <button
                    type="submit"
                    className="btn btn-success text-white fs-4 px-5 py-2 mb-3 me-3"
                    disabled={isLoading || formData.type === ''}
                  >
                    {(isLoading || editLoading) && <ButtonSpinner/>}
                    save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </MyModal>
    </>
  );
};

export default CategoryForm;
