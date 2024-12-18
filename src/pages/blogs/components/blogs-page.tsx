import { SearchInput } from '@/components/ui';
import { BlogCardsWrapper } from '@/pages/blogs/components/blog-cards';

const BlogsPage: React.FC = () => {
  return (
    <div className='space-y-2'>
      <SearchInput />
      <BlogCardsWrapper />
    </div>
  );
};

export default BlogsPage;
