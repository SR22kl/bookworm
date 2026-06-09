"use client";

import { useUser } from "@clerk/nextjs";
import { PLANS, PLAN_LIMITS, PlanType } from "@/lib/subscription-constants";

export const useSubscription = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return {
      plan: PLANS.FREE,
      limits: PLAN_LIMITS[PLANS.FREE],
      isLoaded: false,
    };
  }

  let plan: PlanType = PLANS.FREE;

  const maybePlan = [
    user?.publicMetadata?.plan,
    user?.publicMetadata?.billingPlan,
    user?.publicMetadata?.subscriptionPlan,
    user?.publicMetadata?.activePlan,
    user?.publicMetadata?.planType,
    user?.unsafeMetadata?.plan,
    user?.unsafeMetadata?.billingPlan,
  ].find((value) => value !== undefined && value !== null);

  const metadataPlan = maybePlan?.toString().trim().toLowerCase();

  if (metadataPlan === "pro") {
    plan = PLANS.PRO;
  } else if (metadataPlan === "standard") {
    plan = PLANS.STANDARD;
  }

  return {
    plan,
    limits: PLAN_LIMITS[plan],
    isLoaded: true,
  };
};
