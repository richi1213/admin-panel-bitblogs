import { SearchInput } from '@/components/ui';
import TagSlider from '@/components/ui/tag-slider/tag-slider';
import { BlogCardsWrapper } from '@/pages/blogs/components/blog-cards';

const BlogsPage: React.FC = () => {
  return (
    <div className='space-y-2'>
      <SearchInput />
      <TagSlider />
      <BlogCardsWrapper />
    </div>
  );
};

export default BlogsPage;
