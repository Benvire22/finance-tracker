import {ApiCategory} from '../../types';
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import MyModal from '../MyModal/MyModal';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {closeCategoriesModal, selectShowCategoriesModal} from '../../store/financeSlice';
import ButtonSpinner from '../Spinner/ButtonSpinner';

const initialState: ApiCategory = {
  name: '',
  type: '',
};

interface Props {
  onSubmit: (category: ApiCategory) => void;
  isLoading: boolean,
}

const CategoryForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const isShowModal = useAppSelector(selectShowCategoriesModal);
  const dispatch = useAppDispatch();


  const [formData, setFormData] = useState(initialState);
  const {id} = useParams();

  const changeForm = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const sendForm = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(formData);
    setFormData(initialState);
  };

  const close = () => {
    dispatch(closeCategoriesModal());
  };
  return (
    <>
      <MyModal
        isOpen={isShowModal}
        onClose={close}
      >
        <div className="row px-5 fs-6">
          <h3 className="text-primary-emphasis text-center fs-1 mb-5">{id ? 'Edit' : 'Add'} Category</h3>
          <div className="row mt-2 justify-content-center">
            <div className=" text-primary-emphasis">
              <form onSubmit={sendForm}>
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
                    {isLoading && <ButtonSpinner/>}
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
