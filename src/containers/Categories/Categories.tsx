import CategoryForm from '../../components/CategoryForm/CategoryForm';
import {ApiCategory} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  closeCategoriesModal,
  selectCategories,
  selectCreateLoading,
  showCategoriesModal
} from '../../store/financeSlice';
import {createCategory, fetchCategories} from '../../store/financeThunks';
import {useEffect} from 'react';

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const onCreating = useAppSelector(selectCreateLoading);

  useEffect(() => {
    void dispatch(fetchCategories());
  }, [dispatch]);

  const onSubmit = async (category: ApiCategory) => {
    await dispatch(createCategory(category));
    await dispatch(fetchCategories());
    dispatch(closeCategoriesModal());
  };



  return (
    <>
      <div className="row justify-content-between">
        <h1 className="col-6">Categories</h1>
        <button className="btn btn-success fs-5 col-2" onClick={() => dispatch(showCategoriesModal())}>Add Category</button>
      </div>
      <div className="row justify-content-center my-5">
        {categories.map((category) => (
          <div className="border justify-content-around p-5 col-8 mb-3 rounded d-flex" key={category.id}>
            <span>{category.name}</span>
            <strong className={category.type === 'income' ? 'text-success' : 'text-danger'}>{category.type}</strong>
            <button className="btn-primary">Edit</button>
          </div>
        ))}
      </div>

      <CategoryForm onSubmit={onSubmit} isLoading={onCreating} />
    </>
  );
};

export default Categories;