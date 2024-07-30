import Login from '@/components/Login';
import { FileUpload } from '@/domains/document-analysis/components/FileUpload';
import { useSession } from 'next-auth/react';
export default function IndexPage() {
  const { data, status } = useSession();
  if (status === 'loading') return <h1> loading... please wait</h1>;
  if (status === 'authenticated') {
    return (

      /** Replace this with entry level page TODO */
      <FileUpload />
      
    );
  }
  return (
    <Login />
  );
}