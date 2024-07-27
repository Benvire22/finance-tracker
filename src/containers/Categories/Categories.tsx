import CategoryForm from '../../components/CategoryForm/CategoryForm';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  getCurrentCategory,
  selectCategories,
  selectCreateLoading, selectFetchCategoryLoading,
  showCategoriesModal
} from '../../store/financeSlice';
import {deleteCategory, fetchCategories} from '../../store/financeThunks';
import {useEffect} from 'react';
import {Category} from '../../types';
import CategoryItems from './CategoryItems';
import Spinner from '../../components/Spinner/Spinner';

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const onCreating = useAppSelector(selectCreateLoading);
  const fetchLoading = useAppSelector(selectFetchCategoryLoading);

  useEffect(() => {
    void dispatch(fetchCategories());
  }, [dispatch]);

  const onEdit = (category: Category) => {
    dispatch(showCategoriesModal());
    dispatch(getCurrentCategory(category));
  };

  const onDelete = async (id: string) => {
    await dispatch(deleteCategory(id));
    await dispatch(fetchCategories());
  };

  return (
    <>
      {fetchLoading && <Spinner/>}
      <div className="row justify-content-between">
        <h1 className="col-6">Categories</h1>
        <button className="btn btn-success fs-5 col-2" onClick={() => dispatch(showCategoriesModal())}>Add Category
        </button>
      </div>
      <div className="row justify-content-center my-5">
        {categories.map((category) => (
          <CategoryItems
            key={category.id}
            category={category}
            onDelete={() => onDelete(category.id)}
            onEdit={() => onEdit(category)}
          />
        ))}
      </div>
      <CategoryForm isLoading={onCreating}/>
    </>
  );
};

export default Categories;