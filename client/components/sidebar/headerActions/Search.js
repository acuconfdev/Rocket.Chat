import React, { useState, useEffect, useRef } from 'react';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Sidebar, Box } from '@rocket.chat/fuselage';
import { useMutableCallback } from '@rocket.chat/fuselage-hooks';
import { css } from '@rocket.chat/css-in-js';

import '../../../../app/ui-sidenav/client/toolbar';
import { useOutsideClick } from '../../../hooks/useOutsideClick';

const Search = (props) => {
	const [searchOpen, setSearchOpen] = useState(false);

	const viewRef = useRef();

	const handleCloseSearch = useMutableCallback(() => {
		setSearchOpen(false);
		viewRef.current && Blaze.remove(viewRef.current);
	});

	const handleSearch = useMutableCallback(() => {
		setSearchOpen(true);
	});

	const ref = useOutsideClick(handleCloseSearch);

	useEffect(() => {
		if (searchOpen) {
			const renderSearch = async () => {
				viewRef.current = ref.current && Blaze.renderWithData(Template.toolbar, { onClose: handleCloseSearch }, ref.current);
			};
			renderSearch();
		}
		return () => viewRef.current && Blaze.remove(viewRef.current);
	}, [handleCloseSearch, ref, searchOpen]);

	return <>
		<Sidebar.TopBar.Action icon='magnifier' onClick={handleSearch} {...props}/>
		{searchOpen && <Box position='absolute' w='full' p='x16' bg='neutral-200' className={[css`left: 0; top: 0;`]} ref={ref} />}
	</>;
};

export default Search;