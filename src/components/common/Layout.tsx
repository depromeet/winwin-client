import { useIsFetching } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import type { PropsWithChildren } from 'react';
import { useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import useBottomSheet from '@/hooks/useBottomSheet';
import { headerAtom, popupAtom, spinnerAtom, toastAtom } from '@/store/components/atoms';

import BottomSheet from './BottomSheet';
import BottomSheetOptions from './BottomSheetOptions';
import Header from './Header';
import NavigationBar from './NavigationBar';
import Popup from './Popup';
import Spinner from './Spinner';
import Toast from './Toast';

const hasGnbPath = ['/main', '/profile', '/talent/register'];

const Layout = ({ children }: PropsWithChildren) => {
  const toastValue = useRecoilValue(toastAtom);
  const popupValue = useRecoilValue(popupAtom);
  const headerValue = useRecoilValue(headerAtom);
  const router = useRouter();

  const showGnb = useMemo(() => hasGnbPath.includes(router.pathname), [router]);
  const [isSpinnerActive, setIsSpinnerActive] = useRecoilState(spinnerAtom);
  const { isBottomSheetOpen, closeBottomSheet } = useBottomSheet();

  const isFetching = useIsFetching();

  useEffect(() => {
    let timer = null;

    if (isFetching) {
      if (timer) {
        setIsSpinnerActive(false);
      }
      timer = setTimeout(() => {
        if (isSpinnerActive) {
          setIsSpinnerActive(true);
        }
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, setIsSpinnerActive]);

  return (
    <>
      {headerValue && <Header {...headerValue} />}
      <main className={showGnb ? `pb-[82px]` : ''}>{children}</main>
      {popupValue && <Popup {...popupValue} />}
      {toastValue && <Toast value={toastValue} />}
      {showGnb && <NavigationBar className="fixed bottom-0 left-0" />}
      {isSpinnerActive && <Spinner isDimmed={isSpinnerActive} />}
      <BottomSheet isShowing={isBottomSheetOpen} onClose={closeBottomSheet}>
        <BottomSheetOptions />
      </BottomSheet>
    </>
  );
};

export default Layout;
