"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import {useRouter} from "next/navigation"
import { cn } from "./util";

interface EventData {
	slug: string;
	title: string;
	category: string;
	imageUrl: string;
}

interface CarouselProps {
	events: EventData[];
	options?: EmblaOptionsType;
}

const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined) => {
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

	const onPrevButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollPrev();
	}, [emblaApi]);

	const onNextButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollNext();
	}, [emblaApi]);

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setPrevBtnDisabled(!emblaApi.canScrollPrev());
		setNextBtnDisabled(!emblaApi.canScrollNext());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;
		onSelect(emblaApi);
		emblaApi.on("reInit", onSelect).on("select", onSelect);
	}, [emblaApi, onSelect]);

	return {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	};
};

const PrevButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
	props
) => {
	const { children, ...restProps } = props;
	return (
		<button
			className="w-12 h-12 rounded-full bg-background/50 border border-primary/20 text-primary flex items-center justify-center disabled:opacity-30 transition-all duration-300 hover:bg-primary/20 hover:scale-110"
			type="button"
			{...restProps}
		>
			<svg
				className="w-6 h-6"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<polyline points="15 18 9 12 15 6"></polyline>
			</svg>
			{children}
		</button>
	);
};

const NextButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
	props
) => {
	const { children, ...restProps } = props;
	return (
		<button
			className="w-12 h-12 rounded-full bg-background/50 border border-primary/20 text-primary flex items-center justify-center disabled:opacity-30 transition-all duration-300 hover:bg-primary/20 hover:scale-110"
			type="button"
			{...restProps}
		>
			<svg
				className="w-6 h-6"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<polyline points="9 18 15 12 9 6"></polyline>
			</svg>
			{children}
		</button>
	);
};
const Thumbnail: React.FC<{
	selected: boolean;
	imgSrc: string;
	onClick: () => void;
}> = ({ selected, imgSrc, onClick }) => (
	<div className="flex-grow-0 flex-shrink-0 w-1/5 md:!w-1/6 min-w-0 pl-3">
		<button
			onClick={onClick}
			className="block w-full h-20 rounded-lg overflow-hidden relative"
		>
			<img
				className={cn(
					"absolute inset-0 h-full w-full object-cover transition-all duration-300",
					selected ? "opacity-100 scale-110" : "opacity-40 hover:opacity-70"
				)}
				src={imgSrc}
				alt="Event Thumbnail"
			/>
		</button>
	</div>
);

const TWEEN_FACTOR_BASE = 0.42;

const numberWithinRange = (number: number, min: number, max: number): number =>
	Math.min(Math.max(number, min), max);

export const Carousel: React.FC<CarouselProps> = ({ events, options }) => {
    const router = useRouter()
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [mainRef, mainApi] = useEmblaCarousel(options);
	const [thumbRef, thumbApi] = useEmblaCarousel({
		containScroll: "keepSnaps",
		dragFree: true,
	});

	const tweenFactor = useRef(0);
	const tweenNodes = useRef<(HTMLElement | null)[]>([]);

	const onThumbClick = useCallback(
		(index: number) => {
			if (!mainApi || !thumbApi) return;
			mainApi.scrollTo(index);
		},
		[mainApi]
	);

	const onSelect = useCallback(() => {
		if (!mainApi || !thumbApi) return;
		setSelectedIndex(mainApi.selectedScrollSnap());
		thumbApi.scrollTo(mainApi.selectedScrollSnap());
	}, [mainApi, thumbApi]);

	const setTweenNodes = useCallback((emblaApi: EmblaCarouselType) => {
		tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
			return slideNode.querySelector(".embla__slide__number");
		});
	}, []);

	const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
		tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
	}, []);

	const tweenScale = useCallback(
		(emblaApi: EmblaCarouselType, eventName?: string) => {
			const engine = emblaApi.internalEngine();
			const scrollProgress = emblaApi.scrollProgress();
			const slidesInView = emblaApi.slidesInView();
			const isScrollEvent = eventName === "scroll";

			emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
				let diffToTarget = scrollSnap - scrollProgress;
				const slidesInSnap = engine.slideRegistry[snapIndex];

				slidesInSnap?.forEach((slideIndex) => {
					if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

					if (engine.options.loop) {
						engine.slideLooper.loopPoints.forEach((loopItem) => {
							const target = loopItem.target();
							if (slideIndex === loopItem.index && target !== 0) {
								const sign = Math.sign(target);
								if (sign === -1)
									diffToTarget = scrollSnap - (1 + scrollProgress);
								if (sign === 1)
									diffToTarget = scrollSnap + (1 - scrollProgress);
							}
						});
					}
					const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
					const scale = numberWithinRange(tweenValue, 0, 1).toString();
					const tweenNode = tweenNodes.current[slideIndex];
					if (tweenNode) {
						(tweenNode as HTMLElement).style.transform = `scale(${scale})`;
					}
				});
			});
		},
		[]
	);

	useEffect(() => {
		if (!mainApi) return;
		onSelect();
		setTweenNodes(mainApi);
		setTweenFactor(mainApi);
		tweenScale(mainApi);

		mainApi
			.on("select", onSelect)
			.on("reInit", onSelect)
			.on("reInit", setTweenNodes)
			.on("reInit", setTweenFactor)
			.on("reInit", tweenScale)
			.on("scroll", tweenScale);
	}, [mainApi, onSelect, setTweenNodes, setTweenFactor, tweenScale]);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(mainApi);

	const handleClick = (slug: string) => {
		router.push(`/events/${slug}`);
	};

	return (
		<div className="w-full max-w-7xl mx-auto relative">
			<div className="overflow-hidden" ref={mainRef}>
				<div className="flex -ml-4 md:!-ml-8">
					{events.map((event, index) => (
						<div
							className="flex-grow-0 flex-shrink-0 w-full md:!w-3/5 lg:!w-1/3 min-w-0 pl-4 md:!pl-8"
							key={index}
						>
							<div
								className="embla__slide__number relative block h-[60vh] rounded-2xl bg-cover bg-center overflow-hidden cursor-pointer"
								style={{ backgroundImage: `url(${event.imageUrl})` }}
								onClick={() => {
									if (selectedIndex === index) handleClick(event.slug);
								}}
							>
								{selectedIndex === index && (
									<>
										<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
										<div className="absolute bottom-0 left-0 p-6">
											<h3 className="font-title text-3xl font-bold text-foreground">
												{event.title}
											</h3>
											<p className="text-sm text-foreground/80 mt-1">
												{event.category}
											</p>
										</div>
									</>
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="absolute top-1/2 -translate-y-1/2 left-[1rem] xl:!left-[-2.5rem] hidden md:!block">
				<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
			</div>
			<div className="absolute top-1/2 -translate-y-1/2 right-[1rem] xl:!right-[-2.5rem] hidden md:!block">
				<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
			</div>

			<div className="mt-4">
				<div className="overflow-hidden" ref={thumbRef}>
					<div className="flex -ml-3">
						{events.map((event, index) => (
							<Thumbnail
								key={index}
								onClick={() => onThumbClick(index)}
								selected={index === selectedIndex}
								imgSrc={event.imageUrl}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
