using EventHub.Core.DTOs;
using FluentValidation;
using FluentValidation.Results;
using System;


namespace EventHub.Core.Validators
{
    public class FullEventsDTOValidator : AbstractValidator<FullEventsDTO>
    {
        public FullEventsDTOValidator()
        {
            RuleFor(x => x.Name)
                .NotNull()
                .NotEmpty();

            RuleFor(x => x.Name.Length)
                .LessThan(p => 51);


            RuleFor(x => x.Description)
                .Custom((dto, context) =>
                {
                    var length = dto?.Length;
                    if (length == null)
                        return;
                    if(length > 1024)
                        context.AddFailure(new ValidationFailure(
                       "Dec=scription length",
                       $" '{length}' must be less then 1025 characters"
                       ));
                });



            RuleFor(x => x.StartTime)
                .NotNull()
                .NotEmpty()
                .GreaterThan(p => DateTime.UtcNow);

            RuleFor(x => x)
                .Custom((dto, context) =>
                {
                    var st = dto.StartTime;
                    var end = dto.EndTime;
                    if (end == DateTime.MinValue)
                        return;
                    if (st < end)
                        return;
                    context.AddFailure(new ValidationFailure(
                        "End Time",
                        $" '{end}' should be after start time"
                        ));
                }
               );

        }
    }

}
