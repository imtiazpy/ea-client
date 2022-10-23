import { Dialog, Transition } from '@headlessui/react';
import ModalsContext from '../../../../context/Modals/ModalsContext';
import {PasswordField} from '../../../Common';
import { Fragment, useContext, useState } from 'react';
import { useApiHelper } from '../../../../utility';
import { useRouter } from 'next/router';
import AuthContext from '../../../../context/Auth/AuthContext';
import { toast } from 'react-toastify';
import { InputField } from '../../../Common';

export interface ISignUpModal extends React.ComponentPropsWithoutRef<'div'> {}

export interface IFormData {
  name: string;
  email: string;
  type: string;
  password: string;
  re_password: string;
}

const SignUpModal: React.FC<ISignUpModal> = ({ className, ...divProps }) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "JOB_SEEKER",
    password: "",
    re_password: ""
  });
  const [errorData, setErrorData] = useState('')

  const { signUpModalShow, toggleSignUpModal, toggleSignInModal } = useContext(ModalsContext);
  const gContext = useContext(AuthContext);
  const api = useApiHelper();
  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const onSubmit = (e: any) => {
    e.preventDefault()

    if (formData.password === formData.re_password) {
      api.signUp({...formData}).then((response) => {
        gContext.handleSignUpSuccess()
        toggleSignUpModal();
      }).catch((err) => {
        gContext.validationErrorCB(err);
      });
    } else {
      setErrorData("Password Didn't match");
    }

  }

  return (
    <>
      <Transition appear show={signUpModalShow} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleSignUpModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white align-middle shadow-xl transition-all">
                  <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-bold leading-6 tracking-tight text-gray-900 md:text-2xl"
                          >
                            Create an account
                          </Dialog.Title>
                        
                          <form className="space-y-4 md:space-y-6 text-left" action="/" onSubmit={(e) => onSubmit(e)}>
                          <div>
                              <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Your Name
                              </label>
                              <InputField 
                                type="text"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Your Name..."
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Your email
                              </label>
                              <InputField 
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com"
                                onChange={handleChange}
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Password
                              </label>
                              <PasswordField 
                                name='password'
                                id='password'
                                placeholder='••••••••'
                                onChange={handleChange}
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="confirm-password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Confirm password
                              </label>
                              <PasswordField 
                                name='re_password'
                                id='confirm-password'
                                placeholder='••••••••'
                                onChange={handleChange}
                              />
                            </div>
                            <div className="flex items-start">
                              <div className="flex items-center h-5">
                                <input
                                  id="terms"
                                  aria-describedby="terms"
                                  type="checkbox"
                                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                  required
                                />
                              </div>
                              <div className="ml-3 text-sm">
                                <label
                                  htmlFor="terms"
                                  className="font-light text-gray-500 dark:text-gray-300"
                                >
                                  I accept the{' '}
                                  <a
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    href="#"
                                  >
                                    Terms and Conditions
                                  </a>
                                </label>
                              </div>
                            </div>
                            <button
                              type="submit"
                              className="w-full text-primary-600 bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                              Create an account
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                              Already have an account?{' '}
                              <a
                                href="#"
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                onClick={(e: any) => {
                                  e.preventDefault();
                                  toggleSignUpModal();
                                  toggleSignInModal();
                                }}
                              >
                                Login here
                              </a>
                            </p>
                          </form>
                        </div>
                      </div>
                    </div>
                  </section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SignUpModal;
