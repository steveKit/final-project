import styled from "styled-components";

const Reviews = ({ review }) => {
    const { author_name, rating, text } = review;

    return (
        <>
            <TitleText>
                {author_name}<AccentSpan>{rating}</AccentSpan>
            </TitleText>
            <TextContent>
                {text}
            </TextContent>

        </>
        
    )
};

const TitleText = styled.h3`
    color: var(--secondary-color);
    font-size: 1.5rem;
    margin: 1rem;
`;

const AccentSpan = styled.span`
    color: var(--bold-accent-color);
    font-family: var(--body-font-family);
    font-size: 1.3rem;
    text-shadow: none;
    margin: 0 1rem;
`;

const TextContent = styled.p`
    color: var(--blue-accent-color);
    font-size: 1.2rem;
    font-weight: 500;
    padding: 1px 0;
`;

export default Reviews;